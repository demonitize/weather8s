function guessZipCode(){
  // Skip geolookup until replaced with TWC (wunderground api dead)
  return;

  var zipCodeElement = getElement("zip-code-text");
  // Before filling with auto zip, check and see if
  // there is already an input
  if(zipCodeElement.value != ""){
    return;
  }

  // always use wunderground API for geolookup
  // only valid equivalent is GET v3/location/search
  // TODO: use TWC API GET v3/location/search instead of wunderground geolookup
  fetch(`https://api.wunderground.com/api/${CONFIG.secrets.wundergroundAPIKey}/geolookup/q/autoip.json`)
    .then(function(response) {
      //check for error
      if (response.status !== 200) {
        console.log("Zip code request error");
        return;
      }
      response.json().then(function(data) {
        // Only fill zip if the user didn't touch
        // the box while the zip was fetching
        if(zipCodeElement.value == ""){
          zipCodeElement.value = data.location.zip;
        }
      });
    })
}

function fetchAlerts(){
  var alertCrawl = "";
  fetch(`https://api.weather.gov/alerts/active?point=${latitude},${longitude}`)
    .then(function(response) {
      if (response.status !== 200) {
        console.log("Forecast request error");
        return;
      }
      response.json().then(function(data) {
        if (data.features == undefined){
          fetchForecast();
          return;
        }
        if (data.features.length == 1) {
          alerts[0] = data.features[0].properties.event + '<br>' + data.features[0].properties.description.replace("..."," ").replace(/\*/g, "")
          for(var i = 0; i < data.features.length; i++){
            /* Take the most important alert message and set it as crawl text
            This will supply more information i.e. tornado warning coverage */
            alertCrawl = alertCrawl + " " + data.features[i].properties.description.replace("...", " ");
          }
        }
        else {
          for(var i = 0; i < data.features.length; i++){
            /* Take the most important alert message and set it as crawl text
            This will supply more information i.e. tornado warning coverage */
            alertCrawl = alertCrawl + " " + data.features[i].properties.description.replace("...", " ");

            alerts[i] = data.features[i].properties.event
          }
        }
        if(alertCrawl != ""){
          CONFIG.crawl = alertCrawl;
        }
        alertsActive = alerts.length > 0;
        fetchForecast();
      });
    })
}

function fetchForecast(){
  fetch(`https://api.weather.com/v1/geocode/${latitude}/${longitude}/forecast/daily/10day.json?language=${CONFIG.language}&units=${CONFIG.units}&apiKey=${CONFIG.secrets.twcAPIKey}`)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Forecast request error');
        return;
      }
      response.json().then(function(data) {
        let forecasts = data.forecasts
        // narratives
        isDay = forecasts[0].day; // If the API spits out a day forecast, use the day timings
        let ns = []
        ns.push(forecasts[0].day || forecasts[0].night); // there must be a day forecast so if the API doesn't provide one, just make it the night one. It won't show anyway.
        ns.push(forecasts[0].night);
        ns.push(forecasts[1].day);
        ns.push(forecasts[1].night);
        for (let i = 0; i <= 3; i++) {
          let n = ns[i]
          forecastTemp[i] = n.temp
          forecastIcon[i] = n.icon_code
          forecastNarrative[i] = n.narrative
          forecastPrecip[i] = `${n.pop}% Chance<br/> of ${n.precip_type.charAt(0).toUpperCase() + n.precip_type.substr(1).toLowerCase()}`
        }
        // 7 day outlook
        for (var i = 0; i < 7; i++) {
          let fc = forecasts[i+1]
          outlookHigh[i] = fc.max_temp
          outlookLow[i] = fc.min_temp
          outlookCondition[i] = (fc.day ? fc.day : fc.night).phrase_32char.split(' ').join('<br/>')
          // thunderstorm doesn't fit in the 7 day outlook boxes
          // so I multilined it similar to that of the original
          outlookCondition[i] = outlookCondition[i].replace("Thunderstorm", "Thunder</br>storm");
          outlookIcon[i] = (fc.day ? fc.day : fc.night).icon_code
        }
        fetchRadarImages();
      })
    })
}


function fetchCurrentWeather(){
  fetch(`https://api.weather.com/v3/location/point?postalKey=${zipCode}:${CONFIG.countryCode}&language=${CONFIG.language}&format=json&apiKey=${CONFIG.secrets.twcAPIKey}`)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Conditions request error');
        return;
      }
      response.json().then(function(data) {
        try {
          // which LOCALE?!
          cityName = data.location.displayName.toUpperCase();
          latitude = data.location.latitude;
          longitude = data.location.longitude;
        } catch (err) {
          alert('Enter valid ZIP code');
          console.error(err)
          getZipCodeFromUser();
          return;
        }
        fetch(`https://api.weather.com/v1/geocode/${latitude}/${longitude}/observations/current.json?language=${CONFIG.language}&units=${CONFIG.units}&apiKey=${CONFIG.secrets.twcAPIKey}`)
          .then(function(response) {
            if (response.status !== 200) {
              console.warn("Conditions request error");
                return;
            }
            response.json().then(function(data) {
              // cityName is set in the above fetch call and not this one
              let unit = data.observation[CONFIG.unitField];
              currentTemperature = Math.round(unit.temp); 
              currentCondition = data.observation.phrase_32char;
              windSpeed = `${data.observation.wdir_cardinal} ${unit.wspd} ${CONFIG.units === 'm' ? 'km/h' : 'mph'}`;
              gusts = unit.gust || 'NONE';
              feelsLike = unit.feels_like
              visibility = Math.round(unit.vis)
              humidity = unit.rh
              dewPoint = unit.dewpt
              pressure = unit.altimeter.toPrecision(4);
              let ptendCode = data.observation.ptend_code 
              pressureTrend = (ptendCode == 1 || ptendCode == 3) ? '▲' : ptendCode == 0 ? '' : '▼'; // if ptendCode == 1 or 3 (rising/rising rapidly) up arrow else its steady then nothing else (falling (rapidly)) down arrow
              currentIcon = data.observation.icon_code
              fetchAlerts();
            });
          });
      })
    });

}

function fetchRadarImages(){
  // Skip radar until replaced with some other solution (wunderground api dead)
  // scheduleTimeline();
  // return;


  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C${longitude}?unitGroup=us&key=${CONFIG.secrets.radarAPIKey}&contentType=json`, {
    "method": "GET",
    "headers": {
    }
    })
    .then(async response => {
      let JASON = await response.json();
      await JASON.days[0].stations.forEach((radarStation) => {
        let validRadars = ["KMCE","KDIX","KSJT","KLOT","KFTG","KEYX","KBUF","KDFX","KGRK","KSGF","KHGX","KSRX","KCAE","KAMX","KCCX","KDDC","KVBX","KBBX","KCBW","KMLB","KMBX","RKSG","KGRB","KDMX","KEVX","KESX","KOTX","KRIW","KGWX","KIWX","KGGW","KVNX","KPOE","KFFC","KSHV","KVAX","KLRX","KCXX","KBIS","KHNX","KLWX","KOAX","KFCX","KCRP","KMAF","KCLE","KFDR","KPDT","KDGX","KTWX","KBGM","KATX","PABC","KMTX","KCBX","KUEX","KCLX","KLVX","KPUX","KLSX","KNKX","KVWX","KMSX","KFDX","KNQA","KLZK","KLCH","PAIH","KMKX","PAKC","KILN","PHWA","KEWX","KTYX","KLNX","KLBB","PAEC","KHPX","KRGX","KMAX","KICT","KDTX","KHDX","KMOB","PHKM","KMRX","KUDX","KCYS","KVTX","KMHX","KHDC","KGJX","KBYX","KAPX","KARX","KMUX","KDLH","KDOX","RKJK","PAPD","KSOX","KGSP","KBLX","KTFX","TJUA","PGUA","KMXX","KJKL","KJGX","KBOX","KAMA","RODN","KABR","KHTX","KIND","KTLH","KDVN","KMVX","KBHX","KJAX","KGRR","KFSD","KMQT","KLTX","PHKI","KRAX","PACG","KINX","KEMX","KGYX","KIWA","KRLX","KEAX","PAHG","KSFX","KTBW","KEOX","KABX","KTLX","KRTX","PHMO","KICX","KBRO","KAKQ","KBMX","KYUX","KGLD","KDAX","KENX","KFWS","KOHX","KEPZ","KDYX","KFSX","KPBZ","KMPX","KOKX","KILX","KPAH","KLGX"];
      if (validRadars.includes(radarStation)) {
        
        document.getElementsByClassName("broken-radar-text")[0].style.display = "none";
        document.getElementsByClassName("broken-radar-text")[1].style.display = "none";
        radarImage = new Image();
        radarImage.onerror = function () {
          getElement('radar-container').style.display = 'none';
        }
        radarImage.src = `https://radar.weather.gov/ridge/standard/base_velocity/${radarStation}_loop.gif`;
        getElement("radar-container").style["textAlign"] = "center";
        if(alertsActive){
          zoomedRadarImage = new Image();
          zoomedRadarImage.onerror = function () {
            getElement('zoomed-radar-container').style.display = 'none';
          }
          zoomedRadarImage.src = `https://radar.weather.gov/ridge/standard/${radarStation}_loop.gif`;
          getElement("zoomed-radar-container").style["textAlign"] = "center";
        }
      }
    });
  })
  .catch(err => {
    console.error(err);
  });


  scheduleTimeline();
}
