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
  let outArr = [];
  alerts.forEach((elem, index) => {
    switch (elem) {
      case "Dense Fog Advisory":
        outArr.push({ priority: 0, file: `${basePath}/FG_Y.wav` });
        break;

      case "Winter Storm Watch":
        outArr.push({ priority: 1, file: `${basePath}/WS_A.wav` });
        break;

      case "Flood Watch":
        outArr.push({ priority: 2, file: `${basePath}/FA_A.wav` });
        break;

      case "Hurricane Watch":
        outArr.push({ priority: 3, file: `${basePath}/HU_A.wav` });
        break;

      case "Flash Flood Watch":
        outArr.push({ priority: 4, file: `${basePath}/FF_A.wav` });
        break;

      case "Severe Thunderstorm Watch":
        outArr.push({ priority: 5, file: `${basePath}/SV_A.wav` });
        break;

      case "Tornado Watch":
        outArr.push({ priority: 6, file: `${basePath}/TO_A.wav` });
        break;

      case "Winter Storm Warning":
        outArr.push({ priority: 7, file: `${basePath}/WS_W.wav` });
        break;

      case "Hurricane Warning":
        outArr.push({ priority: 8, file: `${basePath}/HU_W.wav` });
        break;

      case "Severe Thunderstorm Warning":
        outArr.push({ priority: 9, file: `${basePath}/0_SVW.wav` });
        break;

      case "Flash Flood Warning":
        outArr.push({ priority: 10, file: `${basePath}/0_FFW.wav` });
        break;

      case "Tornado Warning":
        outArr.push({ priority: 11, file: `${basePath}/TO_W.wav` });
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
