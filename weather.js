'use strict';

const API_KEY = "6d7bd30481e1e7bc7b798afe1eee644b"
let CITY = "Baku";

let weather = async function () {
    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`)
            .then(response => response.json())
            .then(result => {
                document.getElementById('weather_city').innerText = result.name;
                document.getElementById('weather_temp').innerText = `${Math.trunc(result.main.temp - 273.15)}° C`;
            });
    } catch {
        console.log('Cant fetch API Open Weather Map. Retrying in 10 sec...');
        setTimeout(weather, 10000);
        return;
    }
};

weather();
setInterval(weather, 600000);

