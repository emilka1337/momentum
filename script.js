'use strict'

function getDate(from, count) {
    let now = new Date();
    let time = String(now);
    let result = time.substr(from, count);
    return result
}


function setTime() {
    let currentTime = getDate(16, 5)
    document.getElementById('clocks').innerHTML = currentTime;
}


function ChangeBackground() {
    let month = getDate(8, 2);
    document.getElementById('body').style.backgroundImage = `url(./img2/${month}.jpg)`
}


$("#settings").click(function () {
    $("#settings-menu").toggle(200);
})


setInterval(setTime, 1000);
setInterval(ChangeBackground(), 60000)