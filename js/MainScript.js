// Preset timeline sequences
const MORNING = [
  {
    name: "Now",
    subpages: [
      { name: "current-page", duration: 10000 },
      // { name: "radar-page", duration: 5000 },
    ],
  },
  {
    name: "Today",
    subpages: [
      { name: "today-page", duration: 10000 },
      { name: "tonight-page", duration: 10000 },
    ],
  },
  {
    name: "Tomorrow",
    subpages: [
      { name: "tomorrow-page", duration: 10000 },
      { name: "tomorrow-night-page", duration: 10000 },
    ],
  },
  {
    name: "Beyond",
    subpages: [{ name: "7day-page", duration: 10000 }],
  },
];
const NIGHT = [
  {
    name: "Now",
    subpages: [
      { name: "current-page", duration: 10000 },
      // { name: "radar-page", duration: 5000 },
    ],
  },
  {
    name: "Today",
    subpages: [
      { name: "today-page", duration: 10000 },
      { name: "tonight-page", duration: 10000 },
    ],
  },
  {
    name: "Tomorrow",
    subpages: [
      { name: "tomorrow-page", duration: 10000 },
      { name: "tomorrow-night-page", duration: 10000 },
    ],
  },
  {
    name: "Beyond",
    subpages: [{ name: "7day-page", duration: 10000 }],
  },
];
const SINGLE = [
  { name: "Alert", subpages: [{ name: "single-alert-page", duration: 5000 }] },
  {
    name: "Now",
    subpages: [
      { name: "current-page", duration: 10000 },
      // { name: "radar-page", duration: 5000 },
    ],
  },
  {
    name: "Today",
    subpages: [
      { name: "today-page", duration: 10000 },
      { name: "tonight-page", duration: 10000 },
    ],
  },
  {
    name: "Beyond",
    subpages: [
      { name: "tomorrow-page", duration: 10000 },
      { name: "tomorrow-night-page", duration: 8000 },
      { name: "7day-page", duration: 7000 },
    ],
  },
];
const MULTIPLE = [
  {
    name: "Alerts",
    subpages: [{ name: "multiple-alerts-page", duration: 5000 }],
  },
  {
    name: "Now",
    subpages: [
      { name: "current-page", duration: 10000 },
      // { name: "radar-page", duration: 5000 },
    ],
  },
  {
    name: "Today",
    subpages: [
      { name: "today-page", duration: 10000 },
      { name: "tonight-page", duration: 10000 },
    ],
  },
  {
    name: "Beyond",
    subpages: [
      { name: "tomorrow-page", duration: 10000 },
      { name: "tomorrow-night-page", duration: 8000 },
      { name: "7day-page", duration: 7000 },
    ],
  },
];
const WEEKDAY = ["SUN", "MON", "TUES", "WED", "THU", "FRI", "SAT"];

const jingle = new Audio("assets/music/jingle.wav");
const crawlSpeed = 150;

/* var musicV2 = new Gapless5({
  tracks: ['assets/music/WX_Branding_Short.wav'],
  loop: false,
  loadLimit: 1,
  // mapKeys: {prev: 'a', playpause: 's', stop: 'd', next: 'f'},
}); */

var isDay = true;
var currentLogo;
var currentLogoIndex = 0;
var pageOrder;

var music = new Audio("assets/music/WX_Branding_Short.wav");
var voice = new Audio("assets/narrations/temps/0.wav");
var bgd = "assets/backgrounds/TWC_Kmart.png";
var bgdRed = "assets/backgrounds/SevereRed1.png";
var bgdHurricane = "assets/backgrounds/Hurricane_Central_i2_xD.png"
var bgdSubRed = "assets/backgrounds/SevereRed1.png";
var redMode = false;

window.onload = function () {
  CONFIG.addOption("zip-code", "ZIP Code", "75201");
  CONFIG.addOption(
    "crawlText",
    "Crawl Text",
    "Text that scrolls along the bottom"
  );
  CONFIG.addOption(
    "greetingText",
    "Greeting Text",
    "Message (or joke) that appears at the start"
  );
  CONFIG.load();
  preLoadMusic();
  setMainBackground();
  resizeWindow();
  checkStandbyMode();
  if (
    !CONFIG.loop &&
    !CONFIG.standbyMode &&
    getQueryVariable(`autorun`) != "true"
  ) {
    getElement("settings-container").style.display = "block";
    guessZipCode();
  }
};

function toggleAdvancedSettings() {
  let advancedSettingsOptions = getElement("advanced-settings-options");
  let advancedOptionsText = getElement("advanced-options-text");

  var advancedSettingsHidden =
    advancedSettingsOptions.classList.contains("hidden");

  if (advancedSettingsHidden) {
    advancedSettingsOptions.classList.remove("hidden");
    advancedOptionsText.innerHTML = "Hide advanced options";
  } else {
    advancedSettingsOptions.classList.add("hidden");
    advancedOptionsText.innerHTML = "Show advanced options";
  }
}

function preLoadMusic() {
  /* Sets a random track to play */
  // musicV2.replaceTrack(0, CONFIG.musicTracks[selectRandomArray(CONFIG.musicTracks)]);
  music = new Audio(CONFIG.musicTracks[selectRandomArray(CONFIG.musicTracks)]);
  musicRed = new Audio(CONFIG.redMusicTracks[selectRandomArray(CONFIG.redMusicTracks)]);


  bgd = CONFIG.mainBackgrounds[selectRandomArray(CONFIG.mainBackgrounds)];
  // bgdRed = CONFIG.redModeBackgrounds[selectRandomArray(CONFIG.redModeBackgrounds)];

  bgdRed = CONFIG.redModeBackgrounds[selectRandomArray(CONFIG.redModeBackgrounds)];
  bgdHurricane = CONFIG.hurricaneBackgrounds[selectRandomArray(CONFIG.hurricaneBackgrounds)];
  // bgdRed = CONFIG.winterStormBackgrounds[selectRandomArray(CONFIG.winterStormBackgrounds)];
  bgdSubRed =
    CONFIG.subRedModeBackgrounds[
      selectRandomArray(CONFIG.subRedModeBackgrounds)
    ];

  if (
    bgd == undefined ||
    bgdRed == undefined ||
    bgdSubRed == undefined ||
    bgdHurricane == undefined ||
    music == undefined ||
    musicRed == undefined
  ) {
    console.log("Failed to select one or more random assets. Rerolling!");
    preLoadMusic();
  }

  if (getQueryVariable("prod") == 'true') {
    console.log("We are in production mode!")
    if (CONFIG.productionModeAssets.includes(bgd || bgdRed || bgdSubRed || bgdHurricane || music || musicRed)) {
      console.log("One or more assets were invalid as they are considered trolls. Rerolling!");
      preLoadMusic();
    }
  }
}

/* Set the timeline page order depending on time of day and if
alerts are present */
function scheduleTimeline() {
  if (alerts.length == 1) {
    pageOrder = SINGLE;
  } else if (alerts.length > 1) {
    pageOrder = MULTIPLE;
  } else if (isDay) {
    pageOrder = MORNING;
  } else {
    pageOrder = NIGHT;
  }
  setInformation();
}

function revealTimeline() {
  getElement("timeline-event-container").classList.add("shown");
  getElement("progressbar-container").classList.add("shown");
  getElement("logo-stack").classList.add("shown");
  var timelineElements = document.querySelectorAll(".timeline-item");
  for (var i = 0; i < timelineElements.length; i++) {
    timelineElements[i].style.top = "0px";
  }
}

/* Now that all the fetched information is stored in memory, display them in
the appropriate elements */
function setInformation() {
  setGreetingPage();
    setClockTime(); 
  checkStormMusic();
  setAlertPage();
  setForecast();
  setOutlook();
  createLogoElements();
  setCurrentConditions();
  setTimelineEvents();
  hideSettings();
  checkStandbyMode();
  setTimeout(startAnimation, 1000);
}

function setMainBackground() {
  getElement("background-image").style.backgroundImage = `url(${bgd})`;
}

function checkStormMusic() {
  let tropStorm = new RegExp(/Hurricane|Tropical Storm|Storm Surge/i);
  let majorStorm = new RegExp(
    /Tornado|Flood|Tsunami|Evacuation|Blizzard/i
  );
  let minorStorm = new RegExp(/Test|Severe|Thunder|Cyclone|Wind/i);
  if (majorStorm.test(alerts)) { /* Major Warnings */
    redMode = true;
    getElement("background-image").style.backgroundImage = `url(${bgdRed})`;

    if (getQueryVariable("redTransition") != false) {
      window.obsstudio.setCurrentTransition(getQueryVariable("redTransition"))
    }

  } else if (minorStorm.test(alerts)) { /* Minor Warnings */
    redMode = true;
    getElement("background-image").style.backgroundImage = `url(${bgdSubRed})`;

    if (getQueryVariable("redTransition") != false) {
      window.obsstudio.setCurrentTransition(getQueryVariable("redTransition"))
    }

  } else if (tropStorm.test(alerts)) { /* Tropical Storms */
      redMode = true;
      getElement("background-image").style.backgroundImage = `url(${bgdHurricane})`;

      if (getQueryVariable("redTransition") != false) {
        window.obsstudio.setCurrentTransition(getQueryVariable("redTransition"))
      }
  } else {
    redMode = false;
    if (getQueryVariable("prod") == 'true') {
      getElement("crawl-text").innerText = "The Weather Channel is America's #1 Weather Network. Trusted. Reliable. Accurate.";
    }
  }
}

function startAnimation() {
  setInitialPositionCurrentPage();
  // musicV2.setVolume(0.5);
  music.volume = CONFIG.volume.music;
  musicRed.volume = CONFIG.volume.musicRed;
  jingle.volume = CONFIG.volume.jingle;
  voice.volume = CONFIG.volume.voice;
  jingle.play();
  setTimeout(startMusic, 5000);
  executeGreetingPage();
}

function startMusic() {
  redMode ? musicRed.play() : music.play();
  // musicV2.play();
}

function hideSettings() {
  // Animate settings prompt out
  getElement("settings-prompt").classList.add("hide");
  getElement("settings-container").style.pointerEvents = "none";
}

function executeGreetingPage() {
  getElement("background-image").classList.remove("below-screen");
  getElement("content-container").classList.add("shown");
  getElement("infobar-twc-logo").classList.add("shown");
  getElement("hello-text").classList.add("shown");
  getElement("hello-location-text").classList.add("shown");
  getElement("greeting-text").classList.add("shown");
  getElement("local-logo-container").classList.add("shown");
  setTimeout(clearGreetingPage, 2500);
}

function clearGreetingPage() {
  // Remove transition delay from greeting
  getElement("greeting-text").classList.remove("shown");
  getElement("local-logo-container").classList.remove("shown");

  // Hide everything
  getElement("greeting-text").classList.add("hidden");
  getElement("hello-text-container").classList.add("hidden");
  getElement("hello-location-container").classList.add("hidden");
  getElement("local-logo-container").classList.add("hidden");

  schedulePages();
  loadInfoBar();
  revealTimeline();
  setTimeout(showCrawl, 3000);
}

// Set start and end times for every sub page.
function schedulePages() {
  var cumlativeTime = 0;
  for (var p = 0; p < pageOrder.length; p++) {
    for (var s = 0; s < pageOrder[p].subpages.length; s++) {
      //for every single sub page
      var startTime = cumlativeTime;
      var clearTime = cumlativeTime + pageOrder[p].subpages[s].duration;
      setTimeout(executePage, startTime, p, s);
      setTimeout(clearPage, clearTime, p, s);
      cumlativeTime = clearTime;
    }
  }
}

function executePage(pageIndex, subPageIndex) {
  var currentPage = pageOrder[pageIndex];
  var currentSubPageName = currentPage.subpages[subPageIndex].name;
  var currentSubPageElement = getElement(currentSubPageName);
  var subPageCount = currentPage.subpages.length;
  var currentSubPageDuration = currentPage.subpages[subPageIndex].duration;

  if (subPageIndex === 0) {
    var pageTime = 0;
    for (var i = 0; i < subPageCount; i++) {
      pageTime += currentPage.subpages[i].duration;
    }
    getElement("progressbar").style.transitionDuration = pageTime + "ms";
    getElement("progressbar").classList.add("progress");
    getElement("timeline-event-container").style.left =
      (-280 * pageIndex).toString() + "px";
    getElement("progress-stack").style.left =
      (-280 * pageIndex).toString() + "px";
  }

  if (currentLogo != getPageLogoFileName(currentSubPageName)) {
    getElement("logo-stack").style.left =
      (-85 * currentLogoIndex - 20 * currentLogoIndex).toString() + "px";
    currentLogo = getPageLogoFileName(currentSubPageName);
    currentLogoIndex++;
  }

  currentSubPageElement.style.transitionDelay = "0.5s";

  if (pageIndex === 0 && subPageIndex == 0) {
    currentSubPageElement.style.top = "0px";
    currentSubPageElement.style.left = "0px";
  } else {
    currentSubPageElement.style.left = "0px";
  }

  var isLastPage =
    pageIndex >= pageOrder.length - 1 &&
    subPageIndex >= pageOrder[pageOrder.length - 1].subpages.length - 1;
  if (isLastPage && !CONFIG.standbyMode) setTimeout(hideCrawl, 2000);

  switch (currentSubPageName) {
    case "single-alert-page":
    case "multiple-alerts-page":
      voice.src = alertPriority(alerts);
      voice.volume = CONFIG.volume.voice;
      redMode ? musicRed.volume = CONFIG.volume.musicRedDuck : music.volume = CONFIG.volume.musicDuck;
      voice.play();
      voice.onended = function () {
        redMode ? musicRed.volume = CONFIG.volume.musicRed : music.volume = CONFIG.volume.music;
      };
      // console.log("Voiced alerts coming Soon™");
      break;
    case "current-page":
      setTimeout(loadCC, 1000);
      setTimeout(
        playCurrentConditionsVoice,
        2500
      );
      setTimeout(scrollCC, currentSubPageDuration / 2);
      animateValue("cc-temperature-text", -50, currentTemperature, 2500, 1);
      animateDialFill("cc-dial-color", currentTemperature, 2500);
      break;
    case "radar-page":
      startRadar();
      break;
    case "zoomed-radar-page":
      startZoomedRadar();
      break;
    case "7day-page":
      playOneShotVoice("assets/narrations/7DAY_DEFAULT1.wav", 1);
      break;
  }
}

function playOneShotVoice(file, voiceVol = 1) {
  voice.src = file;
    redMode ? musicRed.volume = CONFIG.volume.musicRedDuck : music.volume = CONFIG.volume.musicDuck;
  voice.volume = voiceVol;
  voice.play();
  voice.onended = function () {
    redMode ? musicRed.volume = CONFIG.volume.musicRed : music.volume = CONFIG.volume.music;
  };
}

function playCurrentConditionsVoice(
  temp = currentTemperature,
  volIntro = CONFIG.volume.voice,
  volTemp = CONFIG.volume.voice,
  volCond = CONFIG.volume.voice
) {
  voice.src = `assets/narrations/CC_INTRO2.wav`;
  redMode ? musicRed.volume = CONFIG.volume.musicRedDuck : music.volume = CONFIG.volume.musicDuck;
  voice.volume = volIntro;
  voice.play();
  voice.onended = function () {
    if (temp >= 140) {
      voice.src = `assets/narrations/temps/very_hot.wav`;
    } else if (temp <= -100) {
      voice.src = `assets/narrations/temps/very_cold.wav`;
    } else if (temp < 0) {
      voice.src = `assets/narrations/temps/M${temp}.wav`;
    } else if (temp == 0) {
      voice.src = `assets/narrations/temps/Zeros.wav`
    }else {
      voice.src = `assets/narrations/temps/${temp}.wav`;
    }
    voice.volume = volTemp;
    voice.play();
    voice.onended = function () {
      voice.src = underFuckedUpSkies(currentCondition);
      voice.volume = volCond;
      voice.play();
      voice.onerror = function () {
        redMode ? musicRed.volume = CONFIG.volume.musicRed : music.volume = CONFIG.volume.music;
      };
      voice.onended = function () {
        redMode ? musicRed.volume = CONFIG.volume.musicRed : music.volume = CONFIG.volume.music;
      };
    };
  };
}

function clearPage(pageIndex, subPageIndex) {
  var currentPage = pageOrder[pageIndex];
  var currentSubPageName = currentPage.subpages[subPageIndex].name;
  var currentSubPageElement = getElement(currentSubPageName);
  var subPageCount = currentPage.subpages.length;
  var currentSubPageDuration = currentPage.subpages[subPageIndex].duration;

  var isNewPage = subPageCount - 1 == subPageIndex;
  var isLastPage =
    pageIndex >= pageOrder.length - 1 &&
    subPageIndex >= pageOrder[pageOrder.length - 1].subpages.length - 1;

  if (isNewPage && !isLastPage) {
    resetProgressBar();
  }

  if (isLastPage) {
    if (CONFIG.standbyMode) {
      // clearPage();
      currentSubPageElement.style.transitionDelay = "0s";
      currentSubPageElement.style.left = "-101%";
      executeGreetingPage();
    }
    endSequence();
  } else {
    currentSubPageElement.style.transitionDelay = "0s";
    currentSubPageElement.style.left = "-101%";
  }
}

function resetProgressBar() {
  getElement("progressbar").style.transitionDuration = "0ms";
  getElement("progressbar").classList.remove("progress");
  void getElement("progressbar").offsetWidth;
}

function startRadar() {
  getElement("radar-container").appendChild(radarImage);
}

function startZoomedRadar() {
  getElement("zoomed-radar-container").appendChild(zoomedRadarImage);
}

function loadCC() {
  var ccElements = document.querySelectorAll(".cc-vertical-group");
  for (var i = 0; i < ccElements.length; i++) {
    ccElements[i].style.top = "0px";
  }
}

function scrollCC() {
  var ccElements = document.querySelectorAll(".cc-vertical-group");
  for (var i = 0; i < ccElements.length; i++) {
    ccElements[i].style.top = "-80px";
  }
  // Split decimal into 2 objects so that we can animate them individually.
  var pressureArray = pressure.toString().split(".");
  animateValue("cc-visibility", 0, visibility, 800, 1);
  animateValue("cc-humidity", 0, humidity, 1000, 1);
  animateValue("cc-dewpoint", 0, dewPoint, 1200, 1);
  animateValue("cc-pressure1", 0, pressureArray[0], 1400, 1);
  animateValue("cc-pressure2", 0, pressureArray[1], 1400, 2);
}

// Called at end of sequence. Animates everything out and shows ending text
function endSequence() {
  if (CONFIG.standbyMode) executeGreetingPage();
  if (!CONFIG.standbyMode) clearInfoBar();
}

function twcLogoClick() {
  var alertMessageShown =
    getElement("alert-message").classList.contains("shown");
  if (alertMessageShown) return;
  var loopStatus = localStorage.getItem("loop");
  if (loopStatus == "y") {
    localStorage.setItem("loop", "n");
    CONFIG.loop = false;
  } else {
    localStorage.setItem("loop", "y");
    CONFIG.loop = true;
  }
  showLoopMessage();
}

function clearInfoBar() {
  getElement("infobar-twc-logo").classList.add("hidden");
  getElement("infobar-local-logo").classList.add("hidden");
  getElement("infobar-location-container").classList.add("hidden");
  getElement("infobar-time-container").classList.add("hidden");
  setTimeout(clearElements, 200);
}

// Animates everything out (not including main background)
function clearElements() {
  if (!CONFIG.standbyMode) {
    getElement("outlook-titlebar").classList.add("hidden");
    getElement("forecast-left-container").classList.add("hidden");
    getElement("forecast-right-container").classList.add("hidden");
    getElement("content-container").classList.add("expand");
    getElement("timeline-container").style.visibility = "hidden";
    showEnding();
    setTimeout(clearEnd, 2000);
  }
}

function showEnding() {
  if (alertsActive) {
    stayUpdated();
  } else {
    itsAmazingOutThere();
  }
}

function itsAmazingOutThere() {
  getElement("amazing-text").classList.add("extend");
  getElement("amazing-logo").classList.add("shown");
  getElement("amazing-container").classList.add("hide");
}

function stayUpdated() {
  getElement("updated-text").classList.add("extend");
  getElement("updated-logo").classList.add("shown");
  getElement("updated-container").classList.add("hide");
}

// Final background animate out
function clearEnd() {
  getElement("background-image").classList.add("above-screen");
  getElement("content-container").classList.add("above-screen");

  // Reload the page after animation has completed
  // If looping is enabled, the sequence will start again
  // Otherwise, the zip code prompt will show again
  if (getQueryVariable("endScene") != 'false') {
    setTimeout(() => {
      window.obsstudio.setCurrentScene(getQueryVariable("endScene"));
      reloadPage();
    }, 400);
  }
  if (!CONFIG.loop && !CONFIG.standbyMode) setTimeout(reloadPage, 400);
  // CONFIG.submit();
}

function reloadPage() {
  location.reload();
}

function loadInfoBar() {
  getElement("infobar-local-logo").classList.add("shown");
  getElement("infobar-location-container").classList.add("shown");
  getElement("infobar-time-container").classList.add("shown");
}

function setClockTime() {
  var now = new Date(
    new Date().toLocaleString("en-US", { timeZone: timeZone })
  );
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");

  const timeString = `${formattedHours}:${minutes}`;

  getElement("infobar-time-text").innerHTML = timeString;

  // Refresh clock every 1 second
  setTimeout(setClockTime, 1000);
}

/* Used to linearly animate a numeric value. In contex, the temperature and
   other current conditions at beginning are animated this way */
function animateValue(id, start, end, duration, pad) {
  var obj = getElement(id);
  if (start == end) {
    obj.innerHTML = end;
    return;
  }
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current.pad(pad);
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

function animateDialFill(id, temperature, duration) {
  var start = -20;
  var end = temperature;
  var obj = getElement(id);
  if (start == end) {
    obj.style.fill = getTemperatureColor(temperature);
    return;
  }
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var timer = setInterval(function () {
    current += increment;
    obj.style.fill = getTemperatureColor(current);
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}
Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

// Used for the beginning dial in order to map warmer
// temperatures to warmer colors and vice versa.
function getTemperatureColor(temperature) {
  if (temperature < -20) {
    return "rgb(0, 0, 255)";
  } else if (temperature > 100) {
    return "rgb(201, 42, 42)";
  }

  var calculatedColor = [0, 0, 0];
  if (temperature < 40) {
    var percent = (temperature + 20) / 60;
    calculatedColor = interpolateColor([24, 100, 171], [77, 171, 247], percent);
  } else if (temperature < 60) {
    var percent = (temperature - 40) / 20;
    calculatedColor = interpolateColor([77, 171, 247], [255, 212, 59], percent);
  } else if (temperature < 80) {
    var percent = (temperature - 60) / 20;
    calculatedColor = interpolateColor([255, 212, 59], [247, 103, 7], percent);
  } else {
    var percent = (temperature - 80) / 20;
    calculatedColor = interpolateColor([247, 103, 7], [201, 42, 42], percent);
  }
  return (
    "rgb(" +
    calculatedColor[0] +
    ", " +
    calculatedColor[1] +
    ", " +
    calculatedColor[2] +
    ")"
  );
}

var interpolateColor = function (color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  var result = color1.slice();
  for (var i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
};

const baseSize = {
  w: 1920,
  h: 1080,
};

window.onresize = resizeWindow;
function resizeWindow() {
  var ww = window.innerWidth;
  var wh = window.innerHeight;
  var newScale = 1;

  // compare ratios
  if (ww / wh < baseSize.w / baseSize.h) {
    // tall ratio
    newScale = ww / baseSize.w;
  } else {
    // wide ratio
    newScale = wh / baseSize.h;
  }

  getElement("render-frame").style.transform =
    "scale(" + newScale + "," + newScale + ")";
}

function getElement(id) {
  return document.getElementById(id);
}

function showCrawl() {
  getElement("crawler-container").classList.add("shown");
  setTimeout(startCrawl, 400); // wait for the settings to fully animate out before starting
}

function hideCrawl() {
  getElement("crawler-container").classList.add("hidden");
  getElement("crawl-text").classList.remove("animate");
  setTimeout(() => getElement("crawler-container").style.display = "none", 2000);
}

function startCrawl() {
  calculateCrawlSpeed();
  getElement("crawl-text").classList.add("animate");
  let killCrawlTime = getElement("crawl-text").style.animationDuration.replace("s", "") * 1000;
  setTimeout(hideCrawl, killCrawlTime);
}

function calculateCrawlSpeed() {
  var crawlTextElement = getElement("crawl-text");
  var elementLength = crawlTextElement.offsetWidth;
  var timeTaken = elementLength / crawlSpeed;
  crawlTextElement.style.animationDuration = timeTaken + "s";
}

function showLoopMessage() {
  var loopStatus = CONFIG.loop ? "enabled" : "disabled";
  alert("Looping " + loopStatus + ", click TWC logo to toggle");
}

function hideAlertMessage() {
  getElement("alert-message").classList.remove("shown");
}

function alert(message) {
  getElement("alert-message").innerHTML = message;
  getElement("alert-message").classList.add("shown");
  setTimeout(hideAlertMessage, 2000);
}
