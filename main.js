'use strict'

// function getDate(from, count) {
//     let now = new Date();
//     let time = String(now);
//     let result = time.substr(from, count);
//     return result
// }

let getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function setTime() {
    let date = new Date;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let AM = +localStorage.getItem('AM-PM');

    if (AM) {
        document.getElementById('AM-PM').checked = true;
    } else {
        document.getElementById('AM-PM').checked = false;
    }

    if (AM) {
        if (hours < 12) {
            if (minutes < 10) {
                document.getElementById('clocks').innerHTML = `${hours}:0${minutes}`;
            } else {
                document.getElementById('clocks').innerHTML = `${hours}:${minutes}`;
            }
        } else {
            document.getElementById('clocks').innerHTML = `${hours - 12}:${minutes}`;
        }
    } else {
        if (hours < 10) {
            document.getElementById('clocks').innerHTML = `0${hours}:${minutes}`;
        } else {
            document.getElementById('clocks').innerHTML = `${hours}:${minutes}`;
        }
        
    }
}

function ChangeBackground() {
    let date = new Date;
    let month = date.getMonth();
    document.getElementById('body').style.backgroundImage = `url(./img2/${month}.jpg)`
}

$("#settings").click(function () {
    $("#settings-menu").toggle(200);
})

function addMainFocus() {
    let focus = $('#focusInput').val();

    if (focus) {
        document.getElementById('mainFocusSet').style.display = 'none';
        document.getElementById('mainFocusReady').style.display = 'flex';
        document.getElementById('mainFocusText').innerText = focus;
        document.getElementById('focusInput').value = '';
    }
}

function removeMainFocus() {
    document.getElementById('mainFocusText').style.textDecoration = 'none';
    document.getElementById('mainFocusSet').style.display = 'flex';
    document.getElementById('mainFocusReady').style.display = 'none';
    document.getElementById('mainFocusText').innerText = '';
    document.getElementById('mainFocusCheckbox').checked = false;
}

setInterval(() => {
    let date = new Date;
    if (date.getHours == 0) {
        removeMainFocus();
    }
}, 3600000);

function striketroughMainFocus() {
    let checked = document.getElementById('mainFocusCheckbox').checked;

    if (checked) {
        document.getElementById('mainFocusText').style.textDecoration = 'line-through';
    } else {
        document.getElementById('mainFocusText').style.textDecoration = 'none';
    }
}

function setQuote() {
    let quotes = [
        {
            quote: '“The world breaks everyone and afterward many are strong at the broken places.”',
            author: 'Emest Hemingway'
        },
        {
            quote: '“If your dreams don’t scare you, they are too small”',
            author: 'Richard Branson'
        },
        {
            quote: '“Good decisions come from experience. Experience comes from making bad decisions”',
            author: 'Mark Twain'
        },
        {
            quote: '“Life is a storm I don’t mind chasing”',
            author: 'Clinton Sammy Jr'
        },
        {
            quote: "“Dreams don't work unless you do”",
            author: 'John C. Maxwell'
        },
        {
            quote: '“As you start to walk out on the way, the way appears.”',
            author: 'Rumi'
        },
        {
            quote: "“One day you will wake up and there won't be any more time to do the things you've always wanted. Do it now.”",
            author: 'Paulo Coelho'
        }
    ];
    let random = getRandom(0, quotes.length);

    document.getElementById('quote').innerText = quotes[random].quote;
    document.getElementById('quoteAuthor').innerText = quotes[random].author;
} setQuote();

document.getElementById('focusInput').addEventListener('blur', addMainFocus);
document.getElementById('mainFocusDelete').addEventListener('click', removeMainFocus);
document.getElementById('mainFocusCheckbox').addEventListener('click', striketroughMainFocus);

setInterval(setTime, 1000);
setInterval(ChangeBackground(), 60000);
setInterval(setQuote, 120000);

(function () {                                       // Проверка пользователя
    if (!localStorage.getItem('username')) {
        localStorage.setItem('username', prompt('Hi! Enter your name, please'));
    }
})();

(function () {
    let mantras = [
        'Greeting',
        'Be yourself.',
        'Be present.',

    ];

    let username = localStorage.getItem('username')

    let random = getRandom(0, mantras.length);
    let mantra = mantras[random];

    if (!random) {
        let date = new Date;
        let time = date.getHours();

        if (time >= 0 && time < 4) {
            document.getElementById('mantra').innerText = `Good night, ${username}`;
        } else if (time >= 4 && time < 12) {
            document.getElementById('mantra').innerText = `Good morning, ${username}`;
        } else if (time >= 12 && time < 16) {
            document.getElementById('mantra').innerText = `Good afternoon, ${username}`;
        } else {
            document.getElementById('mantra').innerText = `Good evening, ${username}`;
        }
    } else {
        document.getElementById('mantra').innerText = mantra;
    }
})()