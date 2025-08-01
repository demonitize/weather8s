var outArr = [];
function checkStandbyMode() {
  if (!CONFIG.standbyMode) return;
  /* OH BOY WE'RE ENTERING SOME REALLY GOOD CODE NOW */

  /*     music = new Gapless5({ */
  //     tracks: ['assets/music/StandbyMode_1.wav'],
  //     loop: true,
  //     loadLimit: 1,
  // }); /* Gives us a seamless loop */

  music = new Audio("assets/music/StandbyMode_3.wav");
  music.loop = true;
  music.play();
  getElement(
    "background-image"
  ).style.backgroundImage = `url('https://i.imgur.com/QEGOx35.jpeg')`;
}

function getQueryVariable(variable) {
  try {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  } catch (err) {
    console.warn(err);
  }
}

function alertPriority(alerts) {
  let basePath = "assets/narrations/alerts/";
  alerts.forEach((elem, index) => {
    console.log(elem)
    switch (true) {
      case elem.includes("Dense Fog Advisory"):
        outArr.push({ priority: 0, file: `${basePath}/FG_Y.wav` });
        break;

      case elem.includes("Winter Storm Watch"):
        outArr.push({ priority: 1, file: `${basePath}/WS_A.wav` });
        break;

      case elem.includes("Flood Watch"):
        outArr.push({ priority: 2, file: `${basePath}/FA_A.wav` });
        break;

      case elem.includes("Hurricane Watch"):
        outArr.push({ priority: 3, file: `${basePath}/HU_A.wav` });
        break;

      case elem.includes("Flash Flood Watch"):
        outArr.push({ priority: 4, file: `${basePath}/FF_A.wav` });
        break;

      case elem.includes("Severe Thunderstorm Watch"):
        outArr.push({ priority: 5, file: `${basePath}/SV_A.wav` });
        break;

      case elem.includes("Tornado Watch"):
        outArr.push({ priority: 6, file: `${basePath}/TO_A.wav` });
        break;

      case elem.includes("Winter Storm Warning"):
        outArr.push({ priority: 7, file: `${basePath}/WS_W.wav` });
        break;

      case elem.includes("Tropical Storm Watch"):
        outArr.push({ priority: 8, file: `${basePath}/TR_A.wav` });
        break;

      case elem.includes("Tropical Storm Warning"):
        outArr.push({ priority: 9, file: `${basePath}/TR_W.wav` });
        break;

      case elem.includes("Hurricane Warning"):
        outArr.push({ priority: 10, file: `${basePath}/HU_W.wav` });
        break;

      case elem.includes("Severe Thunderstorm Warning"):
        outArr.push({ priority: 11, file: `${basePath}/0_SVW.wav` });
        break;

      case elem.includes("Flash Flood Warning"):
        outArr.push({ priority: 12, file: `${basePath}/0_FFW.wav` });
        break;

      case elem.includes("Tornado Warning"):
        outArr.push({ priority: 13, file: `${basePath}/TO_W.wav` });
        break;
      default:
        return false;
    }
  });
  let playedAlert = -1;
  outArr.forEach((elem, index) => {
    if (elem.priority > playedAlert) playedAlert = index;
  });
  return outArr[playedAlert]["file"];
}

const apiCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function cachedFetch(url, options = {}) {
    const cacheKey = url, now = Date.now();
    const cached = apiCache.get(cacheKey);
    if (cached && (now - cached.timestamp < CACHE_TTL)) {
        return cached.data;
    }
    let attempts = 0, maxAttempts = 3;
    while (attempts < maxAttempts) {
        try {
            const res = await fetch(url, options);
            if (res.ok) {
                const data = await res.json();
                apiCache.set(cacheKey, { timestamp: now, data });
                return data;
            }
            attempts++;
            await new Promise(r => setTimeout(r, 1000 * attempts));
        } catch (e) {
            attempts++;
            if (attempts === maxAttempts) throw e;
            await new Promise(r => setTimeout(r, 1000 * attempts));
        }
    }
    if (cached) return cached.data;
    throw new Error(`Failed to fetch ${url}`);
}

function selectRandomArray(arr) {
  return Math.floor(Math.random() * arr.length);
}

/* I know this is a terrible way to do this, but i honestly don't give a fuck -- demonitized */
function underFuckedUpSkies(cond) {
  let basePath = "assets/narrations/cc/";
  switch (cond) {
    case "Fair":
      return `${basePath}3400.wav`;

    case "Sunny":
      return `${basePath}3200.wav`;

    case "Clear":
      return `${basePath}3100.wav`;

    case "Showers":
    case "Showers in the area":
    case "Showers in the vicinity":
      return `${basePath}2680.wav`;

    case "Light Drizzle":
      return `${basePath}901.wav`;

    case "Drizzle":
      return `${basePath}900.wav`;

    case "Light Rain":
      return `${basePath}1101.wav`;

    case "Rain":
    case "Rain Shower":
    case "Rain/Wind":
      return `${basePath}1200.wav`;

    case "Heavy Rain":
      return `${basePath}1102.wav`;

    case "Thunder":
    case "Thunderstorm":
    case "Thunderstorms in the Area":
    case "Thunder in the area":
    case "Light Rain with Thunder":
    case "Heavy Rain with Thunder":
    case "Thunder in the Vicinity":
      return `${basePath}400.wav`;

    case "Heavy Thunder":
    case "Heavy Thunderstorm":
      return `${basePath}402.wav`;

    case "Strong Thunder":
    case "Strong Thunderstorm":
      return `${basePath}422.wav`;

    case "Strong Thunderstorm and Hail":
    case "Strong Thunderstorm & Hail":
    case "Strong Thunderstorm And Hail":
      return `${basePath}1730.wav`;

    case "Light Snow":
      return `${basePath}1601.wav`;

    case "Snow":
      return `${basePath}1600.wav`;

    case "Heavy Snow":
      return `${basePath}1402.wav`;

    case "Partly Cloudy":
      return `${basePath}2900.wav`;

    case "Cloudy":
      return `${basePath}2600.wav`;

    case "Mostly Cloudy":
      return `${basePath}2700.wav`;

    case "Hazy":
      return `${basePath}2100.wav`;

    case "Smokey":
      return `${basePath}2200.wav`;

    case "Fog":
    case "Foggy":
    case "Fog/Wind":
      return `${basePath}2000.wav`;

    case "Tornado":
      return `${basePath}423.wav`;

    case "Funnel Cloud":
      return `${basePath}428.wav`;
  }
}

