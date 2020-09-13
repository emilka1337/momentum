'use strict'

function getDate(from, count) {
    let now = new Date();
    let time = String(now);
    let result = time.substr(from, count);
    return result
}

let getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

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
        }
    ];
    let random = getRandom(0, quotes.length);

    document.getElementById('quote').innerText = quotes[random].quote;
    document.getElementById('quoteAuthor').innerText = quotes[random].author;
}setQuote();

document.getElementById('focusInput').addEventListener('blur', addMainFocus);
document.getElementById('mainFocusDelete').addEventListener('click', removeMainFocus);
document.getElementById('mainFocusCheckbox').addEventListener('click', striketroughMainFocus);

setInterval(setTime, 1000);
setInterval(ChangeBackground(), 60000);
setInterval(setQuote, 120000);