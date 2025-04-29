window.CONFIG = {
    crawl: ``,
    // crawl: `Funny Seasonal Message!`,
    greeting: `Currently Cueing domestic/Z<br>but cutely`,
    language: 'en-US', // Supported in TWC API
    countryCode: 'US', // Supported in TWC API (for postal key)
    units: 'e', // Supported in TWC API (e = English (imperial), m = Metric, h = Hybrid (UK)),
    unitField: 'imperial', // Supported in TWC API. This field will be filled in automatically. (imperial = e, metric = m, uk_hybrid = h)
    loop: true,
    standbyMode: true,
    secrets: {
      // Possibly deprecated key: See issue #29
      // twcAPIKey: 'd522aa97197fd864d36b418f39ebb323'
      twcAPIKey: '71f92ea9dd2f4790b92ea9dd2f779061',
      radarAPIKey: 'V2X2KYG9LLRKQL65NJEEFLURE' 
      /* I KNOW THIS IS A BAD IDEA. If you're going to spam my API keys, please don't. <3*/
    },
    musicTracks: [
      "assets/music/WX_Branding_Short.wav",
    ],
    mainBackgrounds: [
/* Generic Backgrounds */
    "assets/backgrounds/TWC_Kmart.png",
    // "https://i.imgur.com/V41pDkt.jpeg",
    // "https://i.imgur.com/U5rQOJD.jpeg",
    // "https://i.imgur.com/F25Xbv3.jpeg",
    // "https://i.imgur.com/uDZEzSf.jpeg",
    // "https://i.imgur.com/J2W7c7i.jpeg",

    /* Spring Backgrounds */
    // "assets/backgrounds/LOT8Spring2025-1.png",
    // "assets/backgrounds/LOT8Spring2025-2.png"

    /* Winter Backgrounds */
    // "assets/backgrounds/WinterBG_1.png",
    // "assets/backgrounds/WinterBG_2.png",
    // "assets/backgrounds/WinterBG_3.png",

    /* XMas Background */
    // "https://i.imgur.com/w223SHG.jpeg"
    ],
    redModeBackgrounds: [
      /* Legacy Red Mode */
      // "https://i.imgur.com/qifw2Se.jpeg",
      // "https://i.imgur.com/mvc9y58.jpeg",
      // "https://i.imgur.com/EvPe49F.jpeg",
      // "https://i.imgur.com/eGZ4EtJ.jpeg",
  
      /* Current Red Mode */
      "assets/backgrounds/SevereRed1.png",
      "assets/backgrounds/SevereRed2.png",
      "assets/backgrounds/SevereRed3.png",
      
    ],
    subRedModeBackgrounds: [
      /* Legacy Sub-Red Mode */
      // "https://i.imgur.com/HP5NCFW.jpeg",
      // "https://i.imgur.com/cbQPlEP.jpeg",
      // "https://i.imgur.com/oZFV8ew.jpeg",
      // "https://i.imgur.com/zI68plR.jpeg",
  
      /* Current Red Mode */
      "assets/backgrounds/Severe1.png",
      "assets/backgrounds/Severe2.png",
      "assets/backgrounds/Severe3.png",
    ],
    hurricaneBackgrounds: [
      "assets/backgrounds/Hurricane_Central_i2_xD.png",
      "assets/backgrounds/HurricaneRedMode.png",
      "assets/backgrounds/HurricaneBlue.png",
      "assets/backgrounds/HurricaneRed1.png",
      "assets/backgrounds/HurricaneRed2.png",
      "assets/backgrounds/HurricaneRed3.png",
    ],
    winterStormBackgrounds: [
      "assets/backgrounds/WinterRedBG_1.png",
      "assets/backgrounds/WinterRedBG_1.png",
      "assets/backgrounds/WinterRedBG_1.png",
      // "https://i.imgur.com/gSNIkl0.jpeg",
    ],
  
    // Config Functions (index.html settings manager)
    options: [],
    addOption: (id, name, desc) => {
      CONFIG.options.push({
        id,
        name,
        desc,
      })
    },
    submit: (btn, e) => {
      let args = {}
      CONFIG.options.forEach((opt) => {
        args[opt.id] = getElement(`${opt.id}-text`).value
        localStorage.setItem(opt.id, args[opt.id])
      })
      if (args.crawlText !== '') CONFIG.crawl = args.crawlText
      if (args.greetingText !== '') CONFIG.greeting = args.greetingText
      if (args.loop === 'y') CONFIG.loop = true
      if (getQueryVariable(`zip`) != false) {
        zipCode = getQueryVariable(`zip`);
      } else if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(args['zip-code'])){
        zipCode = args['zip-code'];
      } else {
        alert("Enter valid ZIP code");
        return;
      }
      CONFIG.unitField = CONFIG.units === 'm' ? 'metric' : (CONFIG.units === 'h' ? 'uk_hybrid' : 'imperial')
      fetchCurrentWeather();
    },
    load: () => {
      let settingsPrompt = getElement('settings-prompt')
      let zipContainer = getElement('zip-container')
      let advancedSettingsOptions = getElement('advanced-settings-options')
      CONFIG.options.forEach((option) => {
        //<div class="regular-text settings-item settings-text">Zip Code</div>
        let label = document.createElement('div')
        label.classList.add('strong-text', 'settings-item', 'settings-text')
        label.appendChild(document.createTextNode(option.name))
        label.id = `${option.id}-label`
        //<input class="settings-item settings-text" type="text" id="zip-code-text">
        let textbox = document.createElement('input')
        textbox.classList.add('settings-item', 'settings-text', 'settings-input')
        textbox.type = 'text'
        textbox.style.fontSize = '20px'
        textbox.placeholder = option.desc
        textbox.id = `${option.id}-text`
        if (localStorage.getItem(option.id)) textbox.value = localStorage.getItem(option.id)
        let br = document.createElement('br')
        if(textbox.id == "zip-code-text"){
          textbox.setAttribute('maxlength', '5')
          textbox.style.fontSize = '35px'
          label.style.width = "auto"
          zipContainer.appendChild(label)
          zipContainer.appendChild(textbox)
          zipContainer.appendChild(br)
        }
        else{
          advancedSettingsOptions.appendChild(label)
          advancedSettingsOptions.appendChild(textbox)
          advancedSettingsOptions.appendChild(br)
        }
        //<br>
      })
      let advancedButtonContainer = document.createElement('div')
      advancedButtonContainer.classList.add('settings-container')
      settingsPrompt.appendChild(advancedButtonContainer)
      let advancedButton = document.createElement('button')
      advancedButton.innerHTML = "Show advanced options"
      advancedButton.id = "advanced-options-text"
      advancedButton.setAttribute('onclick', 'toggleAdvancedSettings()')
      advancedButton.classList.add('regular-text', 'settings-input', 'button')
      advancedButtonContainer.appendChild(advancedButton)
      //<button class="setting-item settings-text" id="submit-button" onclick="checkZipCode();" style="margin-bottom: 10px;">Start</button>-->
      let btn = document.createElement('button')
      btn.classList.add('setting-item', 'settings-text', 'settings-input', 'button')
      btn.id = 'submit-button'
      btn.onclick = CONFIG.submit
      btn.style = 'margin-bottom: 10px;'
      btn.appendChild(document.createTextNode('Start'))
      settingsPrompt.appendChild(btn)
      if (CONFIG.loop || localStorage.getItem('loop') === 'y' || CONFIG.standbyMode) {
        zipCode = getQueryVariable(`zip`);
        CONFIG.loop = true;
        hideSettings();
        CONFIG.submit()
      }
    }
  }
  
  CONFIG.unitField = CONFIG.units === 'm' ? 'metric' : (CONFIG.units === 'h' ? 'uk_hybrid' : 'imperial')
  