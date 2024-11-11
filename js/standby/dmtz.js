function checkStandbyMode() {
    if (!CONFIG.standbyMode) return;
    /* OH BOY WE'RE ENTERING SOME REALLY GOOD CODE NOW */
    
    // getElement('background-image').style.backgroundImage = `url('assets/backgrounds/TWC_Kmart.png')`;
    getElement('background-image').style.backgroundImage = `url('${CONFIG.winterStormBackgrounds[0]}')`;
    
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
  