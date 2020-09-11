'use strict'

!function checkSettings() {
    if (localStorage.getItem('breathing') == 'true') {
        document.getElementById('breathing').checked = true;
        changeClocksBreathing()
    }
}()


function changeClocksBreathing() {
    if (document.getElementById('breathing').checked) {
        document.getElementById('clocks').style.animation = 'clocks 2s ease alternate-reverse infinite';
        localStorage.setItem('breathing', true)
    } else {
        document.getElementById('clocks').style.animation = 'none'
        localStorage.setItem('breathing', false)
    }
}