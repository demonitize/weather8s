window.CONFIG = {
  crawl: `You're watching Kmart News Network! The Weather Channel is America's #1 Weather Network. Trusted. Reliable. Accurate.`,
  // crawl: `Funny Seasonal Message!`,
  greetings: [
    "Here's Your<br>Local Weather",
    "Currently In<br>Our Area",
    "Jim Cantore<br>My Beloved",
    "LDL Sold<br>Separately",
    "I Promise The Weather<br>Gets Better Tomorrow",
    "Canada Isn't Real<br>Change My Mind",
    "Not So<br>IntelliSTAR",
    "If It's Raining We Become<br>The Wetter Channel",
    "A Hurricane Warning<br>A Hurricane Warning<br>A Hurricane Warning<br>A Hurricane Warning<br>A Hurricane Warning<br>A Hurricane Warning<br>A Hurricane Warning<br>A Hurricane Warning",
    "OOPS!<br>All Weather.",
    "Who Knew Forecasting<br>Was So Fun?",
    "Now Cueing<br>domestic/azul",
    "Here's Our<br>Seven!",
    "Powered By<br>Magic™",
    "Trans Rights<br>Are Human Rights",
    "This Forecast is<br>Skibidi Rizz Fanum Tax",
    "Look Ma!<br>I'm On TV!",
    "Would You Like<br>A Free Storm?",
    "I Like My Eggs<br>Sunny Side Up",
    "Roses are Red, Violets are Blue<br>Here's Your Weather, Now STFU",
    "IT'S RAINING MEN<br>HALLELUJAH",
    "Put The Weather<br>In The Bag!",
    "Insert Joke Here<br>Bottom Text",
    "Can We Have Hatsune Miku<br>Host The Weather Channel?",
    "No Mom,<br>We're Not There Yet",
    "The Damn Weather<br>Machine Broke Again",
    "Please Stop Putting The<br>Weather Machine On Seven",
  ],
  language: "en-US", // Supported in TWC API
  countryCode: "US", // Supported in TWC API (for postal key)
  units: "e", // Supported in TWC API (e = English (imperial), m = Metric, h = Hybrid (UK)),
  unitField: "imperial", // Supported in TWC API. This field will be filled in automatically. (imperial = e, metric = m, uk_hybrid = h)
  loop: false,
  standbyMode: false,
  secrets: {
    // Possibly deprecated key: See issue #29
    // twcAPIKey: 'd522aa97197fd864d36b418f39ebb323'
    twcAPIKey: "71f92ea9dd2f4790b92ea9dd2f779061",
    radarAPIKey: "V2X2KYG9LLRKQL65NJEEFLURE",
    /* I KNOW THIS IS A BAD IDEA. If you're going to spam my API keys, please don't. <3*/
  },
  musicTracks: [
    /* Original Music */
    "assets/music/WX_AMHQ_1.wav",
    "assets/music/WX_AMHQ_2.wav",
    "assets/music/WX_Tomorrows_Sunrise.wav",
    "assets/music/WX_Branding_Short.wav",
    "assets/music/WX_Clouds_May_Come.wav",
    "assets/music/WX_Song_6.wav",
    "assets/music/WX_Song_7.wav",
    "assets/music/WX_Song_11.wav",
    "assets/music/WX_Wake_Up_With_Al_1.wav",
    "assets/music/WX_Wake_Up_With_Al_2.wav",
    "assets/music/WX_Weekend_Recharge_1.wav",
    "assets/music/WX_Weekend_Recharge_2.wav",

    /* New Music */

    "assets/music/new/1.mp3",
    "assets/music/new/2.mp3",
    "assets/music/new/3.mp3",
    "assets/music/new/4.mp3",
    "assets/music/new/5.mp3",
    "assets/music/new/6.mp3",
    "assets/music/new/7.mp3",
    "assets/music/new/8.mp3",
    "assets/music/new/9.mp3",
    "assets/music/new/10.mp3",
    "assets/music/new/11.mp3",
    "assets/music/new/12.mp3",
    "assets/music/new/13.mp3",
    "assets/music/new/14.mp3",
    "assets/music/new/15.mp3",
  ],
  mainBackgrounds: [
    /* Generic Backgrounds */
    "assets/backgrounds/TWC_Kmart.png",
    // "https://i.imgur.com/V41pDkt.jpeg",
    // "https://i.imgur.com/U5rQOJD.jpeg",
    // "https://i.imgur.com/F25Xbv3.jpeg",
    // "https://i.imgur.com/uDZEzSf.jpeg",
    // "https://i.imgur.com/J2W7c7i.jpeg",
    "assets/backgrounds/FreakyChannel.png",

    /* Spring Backgrounds */
    // "assets/backgrounds/LOT8Spring2025-1.png",
    // "assets/backgrounds/LOT8Spring2025-2.png",

    /* Winter Backgrounds */
    // "assets/backgrounds/WinterBG_1.png",
    // "assets/backgrounds/WinterBG_2.png",
    // "assets/backgrounds/WinterBG_3.png",

    /* Hurricane Backgrounds */
    "assets/backgrounds/HurricaneBlue.png",

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
    "assets/backgrounds/FreakyChannelRed.png",
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
    "assets/backgrounds/FreakyChannelRed.png",
  ],
  hurricaneBackgrounds: [
    "assets/backgrounds/FreakyChannelRed.png",
    "assets/backgrounds/Hurricane_Central_i2_xD.png",
    "assets/backgrounds/HurricaneRedMode.png",
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
    });
  },
  submit: (btn, e) => {
    let args = {};
    CONFIG.options.forEach((opt) => {
      args[opt.id] = getElement(`${opt.id}-text`).value;
      localStorage.setItem(opt.id, args[opt.id]);
    });
    if (args.crawlText !== "") CONFIG.crawl = args.crawlText;
    if (args.greetingText !== "")
      CONFIG.greetings[selectRandomArray(CONFIG.greetings)] = args.greetingText;
    if (args.loop === "y") CONFIG.loop = true;
    if (getQueryVariable(`zip`) != false) {
      zipCode = getQueryVariable(`zip`);
    } else if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(args["zip-code"])) {
      zipCode = args["zip-code"];
    } else {
      alert("Enter valid ZIP code");
      return;
    }
    CONFIG.unitField =
      CONFIG.units === "m"
        ? "metric"
        : CONFIG.units === "h"
        ? "uk_hybrid"
        : "imperial";
    fetchCurrentWeather();
  },
  load: () => {
    let settingsPrompt = getElement("settings-prompt");
    let zipContainer = getElement("zip-container");
    let advancedSettingsOptions = getElement("advanced-settings-options");
    CONFIG.options.forEach((option) => {
      //<div class="regular-text settings-item settings-text">Zip Code</div>
      let label = document.createElement("div");
      label.classList.add("strong-text", "settings-item", "settings-text");
      label.appendChild(document.createTextNode(option.name));
      label.id = `${option.id}-label`;
      //<input class="settings-item settings-text" type="text" id="zip-code-text">
      let textbox = document.createElement("input");
      textbox.classList.add("settings-item", "settings-text", "settings-input");
      textbox.type = "text";
      textbox.style.fontSize = "20px";
      textbox.placeholder = option.desc;
      textbox.id = `${option.id}-text`;
      if (localStorage.getItem(option.id))
        textbox.value = localStorage.getItem(option.id);
      let br = document.createElement("br");
      if (textbox.id == "zip-code-text") {
        textbox.setAttribute("maxlength", "5");
        textbox.style.fontSize = "35px";
        label.style.width = "auto";
        zipContainer.appendChild(label);
        zipContainer.appendChild(textbox);
        zipContainer.appendChild(br);
      } else {
        advancedSettingsOptions.appendChild(label);
        advancedSettingsOptions.appendChild(textbox);
        advancedSettingsOptions.appendChild(br);
      }
      //<br>
    });
    let advancedButtonContainer = document.createElement("div");
    advancedButtonContainer.classList.add("settings-container");
    settingsPrompt.appendChild(advancedButtonContainer);
    let advancedButton = document.createElement("button");
    advancedButton.innerHTML = "Show advanced options";
    advancedButton.id = "advanced-options-text";
    advancedButton.setAttribute("onclick", "toggleAdvancedSettings()");
    advancedButton.classList.add("regular-text", "settings-input", "button");
    advancedButtonContainer.appendChild(advancedButton);
    //<button class="setting-item settings-text" id="submit-button" onclick="checkZipCode();" style="margin-bottom: 10px;">Start</button>-->
    let btn = document.createElement("button");
    btn.classList.add(
      "setting-item",
      "settings-text",
      "settings-input",
      "button"
    );
    btn.id = "submit-button";
    btn.onclick = CONFIG.submit;
    btn.style = "margin-bottom: 10px;";
    btn.appendChild(document.createTextNode("Start"));
    settingsPrompt.appendChild(btn);
    if (
      CONFIG.loop ||
      localStorage.getItem("loop") === "y" ||
      CONFIG.standbyMode
    ) {
      zipCode = getQueryVariable(`zip`);
      CONFIG.loop = true;
      hideSettings();
      CONFIG.submit();
    }
    if (getQueryVariable(`autorun`) == "true") {
      CONFIG.submit();
    }
    if (getQueryVariable("startScene") != false) {
      window.obsstudio.getCurrentScene(function (scene) {
        console.log(scene);
        if (scene == getQueryVariable("startScene")) {
          CONFIG.submit();
        }
      });
    }
  },
};

CONFIG.unitField =
  CONFIG.units === "m"
    ? "metric"
    : CONFIG.units === "h"
    ? "uk_hybrid"
    : "imperial";
