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
    getElement('background-image').style.backgroundImage = `url('https://i.imgur.com/QEGOx35.jpeg')`;
    
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
  