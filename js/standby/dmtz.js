function checkStandbyMode() {
  if (!CONFIG.standbyMode) return;
  /* OH BOY WE'RE ENTERING SOME REALLY GOOD CODE NOW */

  // getElement('background-image').style.backgroundImage = `url('assets/backgrounds/TWC_Kmart.png')`;
  getElement(
    "background-image"
  ).style.backgroundImage = `url('${CONFIG.mainBackgrounds[0]}')`;
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

var resetPosition = {
  current() {
    getElement(`tomorrow-page`).style.display = "none";
    getElement(`tomorrow-page`).style.left = "101%";

    getElement(`tomorrow-night-page`).style.display = "none";
    getElement(`tomorrow-night-page`).style.left = "101%";
    getElement(`tonight-page`).style.display = "block";
  },
  tonight() {
    getElement(`7day-page`).style.display = "none";
    getElement(`7day-page`).style.left = "101%";
    getElement(`tomorrow-page`).style.display = "block";
    getElement(`tomorrow-night-page`).style.display = "block";
  },
  tomorrow() {
    getElement(`current-page`).style.display = "none";
    getElement(`current-page`).style.left = "101%";

    getElement(`today-page`).style.display = "none";
    getElement(`today-page`).style.left = "101%";

    getElement(`7day-page`).style.display = "block";


    getElement(`single-alert-page`).style.display = "none";
    getElement(`single-alert-page`).style.left = "101%";

    getElement(`multiple-alerts-page`).style.display = "none";
    getElement(`multiple-alerts-page`).style.left = "101%";
  },
  outlook() {
    getElement(`tonight-page`).style.display = "none";
    getElement(`tonight-page`).style.left = "101%";
    getElement(`today-page`).style.display = "block";

    getElement(`single-alert-page`).style.display = "block";
    getElement(`multiple-alerts-page`).style.display = "block";

    getElement(`current-page`).style.display = "block";
  },
};


function selectRandomArray(arr) {
  return Math.floor(Math.random() * arr.length);
}