function checkStandbyMode() {
    if (!CONFIG.standbyMode) return;
    /* OH BOY WE'RE ENTERING SOME REALLY GOOD CODE NOW */
    
    getElement('background-image').style.backgroundImage = `url('assets/backgrounds/TWC_Kmart.png')`;
    
}