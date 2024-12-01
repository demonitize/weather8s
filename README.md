# weather8s
A web application that displays weather information in the same visual presentation as the cable headend unit [Intellistar 2 XD](https://en.wikipedia.org/wiki/IntelliStar2)

Original source can be found at <https://github.com/coolguyunblocked/Intellistar-2-XD-Emulator/>


## Overview
This is a local forecast segment that airs on The Weather Channel called the "Local on the 8s". The name is because it airs at timeslots that end in "8" (9:28, 2:48, etc.). The forecast is approximately a minute long and provides information on current and forecasted weather conditions. This type of forecast started in 1982 using WeatherStar units. It was later upgraded to the IntelliStar 1 in 2003 and recieved various graphic changes over the years. The IntelliStar 2 had replaced the IntelliStar 1 by 2015. This emulator uses the style that started in 2019.

## Instructions
1. Visit: <https://demonitize.github.io/weather8s/>.
2. Enter zip code
3. Click start
4. Press F11 for fullscreen

## Features
Most of core animation and logic has been replicated including severe weather alerts, forecast descriptions, crawl text, and the Doppler radar map (currently broken. Only works for some zip codes.)

You can preset a zip code by using `?zip=` and then a zip code. You can then make it start by itself with `&autorun=true`. 

You can make it infinitely loop by using <https://demonitize.github.io/weather8s/standby>. You should likely use the `?zip=` paramater since you don't get an interface to input a zip code. If the `?zip=` paramater isn't present, it will use the previous zipcode.

Enjoy!
