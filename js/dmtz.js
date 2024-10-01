function checkStandbyMode() {
    if (!CONFIG.standbyMode) return;
    /* OH BOY WE'RE ENTERING SOME REALLY GOOD CODE NOW */

/*     music = new Gapless5({ */
    //     tracks: ['assets/music/StandbyMode_1.wav'],
    //     loop: true,
    //     loadLimit: 1,
    // }); /* Gives us a seamless loop */

    music = new Audio("assets/music/StandbyMode_1.wav");
    music.loop = true;
    music.play();
    getElement('background-image').style.backgroundImage = `url(${bgdRed})`;
    
}