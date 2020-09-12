(async function () {
    let response = await fetch('https://api.openweathermap.org/data/2.5/weather?id=587084&appid=6d7bd30481e1e7bc7b798afe1eee644b');

    response.json().then((result) => {
        document.getElementById('weather_city').innerText = result.name;
        document.getElementById('weather_temp').innerText = `${result.main.temp - 273.15}° C`;
        
    });
})();