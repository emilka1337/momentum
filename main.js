'use strict'

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
        if (hours < 10 && minutes < 10) {
            document.getElementById('clocks').innerHTML = `0${hours}:0${minutes}`;
        } else if (hours < 10) {
            document.getElementById('clocks').innerHTML = `0${hours}:${minutes}`;
        } else if (minutes < 10) {
            document.getElementById('clocks').innerHTML = `${hours}:0${minutes}`;
        } else {
            document.getElementById('clocks').innerHTML = `${hours}:${minutes}`;
        }

    }
}

function ChangeBackground() {
    let date = new Date;
    let month = date.getMonth();
    document.getElementById('body').style.backgroundImage = `url(./img/${month}.jpg)`
}

$("#settings").click(function () {
    $("#settings-menu").toggle(200);
})

function addMainFocus() {
    let date = new Date;
    let focus = document.getElementById('focusInput').value;
    let day = date.getDate();
    let mainFocus = {
        'focus':  focus,
        'day': day
    };

    if (focus) {
        localStorage.setItem('mainFocus', JSON.stringify(mainFocus));
        document.getElementById('mainFocusSet').style.display = 'none';
        document.getElementById('mainFocusReady').style.display = 'flex';
        document.getElementById('mainFocusText').innerText = focus;
        document.getElementById('focusInput').value = '';
    }
}

document.getElementById('focusInput').addEventListener('keypress', (event) => {
    if (event.code == 'Enter') {
        addMainFocus();
    }
})

function removeMainFocus() {
    document.getElementById('mainFocusText').style.textDecoration = 'none';
    document.getElementById('mainFocusReady').style.display = 'none';
    document.getElementById('mainFocusSet').style.display = 'flex';
    document.getElementById('mainFocusText').innerText = '';
    document.getElementById('mainFocusCheckbox').checked = false;

    localStorage.removeItem('mainFocus');
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
        localStorage.setItem('mainFocusChecked', 1);
    } else {
        document.getElementById('mainFocusText').style.textDecoration = 'none';
        localStorage.removeItem('mainFocusChecked');
    }
}

document.getElementById('focusInput').addEventListener('blur', addMainFocus);
document.getElementById('mainFocusDelete').addEventListener('click', removeMainFocus);
document.getElementById('mainFocusCheckbox').addEventListener('click', striketroughMainFocus);

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
        },
        {
            quote: "“Live your dream, and share your passion.”",
            author: "Holstee Manifesto"
        },
    ];
    let random = getRandom(0, quotes.length);

    document.getElementById('quote').innerText = quotes[random].quote;
    document.getElementById('quoteAuthor').innerText = quotes[random].author;
} setQuote();

function addItemToBookmarks(name, url) {
    if (!localStorage.getItem('bookmarks')) {
        let bookmarks = [];
        let bookmark = {
            'name': name,
            'url': `http://${url}`
        };
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        pushItemToBookmarks(bookmark, 0);
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        let bookmark = {
            'name': name,
            'url': `http://${url}`
        };
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        pushItemToBookmarks(bookmark, bookmarks.length);
    }
}

function addItemsToBookmarksButton() {
    let name = prompt('Enter name of site');
    if (name == undefined) {
        return;
    }
    let url = prompt('Enter url of site');
    if (url == undefined) {
        return;
    }

    if (name && url) {
        addItemToBookmarks(name, url);
    } else {
        alert('One of your onputs are incorrect');
    }
}

function removeItemFromBookmarks(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('linksList').removeChild(document.getElementById(`bookmark${index}`));
}

function pushItemToBookmarks(bookmark, index, imgLink) {
    let linksList = document.getElementById('linksList');
    linksList.removeChild(document.getElementById('addBookmarkButton'));

    let li = document.createElement('li');
    let a = document.createElement('a');
    let div = document.createElement('div');
    let button = document.createElement('button');
    let i = document.createElement('i');

    li.style.position = 'relative';
    li.id = `bookmark${index}`;
    a.setAttribute('href', bookmark.url);
    div.innerHTML = `<img src = https://www.google.com/s2/favicons?domain=${imgLink} style="margin-right: 5px;"> ${bookmark.name}`;
    div.style.padding = '1px 0px';
    button.setAttribute('value', index);
    let buttonStyles = ['float', 'padding', 'position', 'top', 'right', 'zIndex'];
    let buttonStylesValues = ['right', '0px', 'absolute', '0px', '10px', '1'];
    for (let i in buttonStyles) {
        button.style[buttonStyles[i]] = buttonStylesValues[i];
    }
    button.setAttribute('value', index);
    button.setAttribute('onclick', 'removeItemFromBookmarks(this.value)')
    i.className = 'fas fa-times';
    i.style.color = '#ffffffb0';

    linksList.appendChild(li)
    li.appendChild(a);
    li.appendChild(button);
    a.appendChild(div);
    button.appendChild(i);
    linksList.appendChild(createAddBookmarkButton());
}

function createAddBookmarkButton() {
    let button = document.createElement('button');
    button.id = 'addBookmarkButton';
    button.innerHTML = 'Add <i class="fas fa-plus"></i>';
    button.setAttribute('onclick', `addItemsToBookmarksButton()`);
    button.style.borderRadius = `5px`;

    return button;
}

$('#links').click(() => {
    $('#linksDropdown').toggle(200);
})


setInterval(setTime, 1000);
setInterval(ChangeBackground(), 60000);
setInterval(setQuote, 120000);

(function () {                                       // Проверка пользователя
    if (!localStorage.getItem('username')) {
        localStorage.setItem('username', prompt('Hi! Enter your name, please'));
    }
})();

(function () {                                      // Мантры
    let mantras = [
        'Greeting',
        'Be yourself.',
        'Be present.',
        'Be kind to yourself.',

    ];

    let username = localStorage.getItem('username');

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
})();

(function () {                                      // Main focus
    let mainFocus = JSON.parse(localStorage.getItem('mainFocus'));
    let date = new Date;

    if (focus && date.getDate() == mainFocus.day) {
        document.getElementById('focusInput').value = mainFocus.focus;
        addMainFocus();
        if (localStorage.getItem('mainFocusChecked')) {
            document.getElementById('mainFocusCheckbox').checked = true;
            striketroughMainFocus();
        }
    } else {
        removeMainFocus();
    }
})();

(function () {                                      // Динамичная генерация закладок
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    document.getElementById('linksList').appendChild(createAddBookmarkButton());

    if (bookmarks) {
        let index = 0;
        for (let bookmark of bookmarks) {
            let imgLink = bookmark.url.substr(7, bookmark.url.length);
            pushItemToBookmarks(bookmark, index, imgLink);
            index++;
        }
    }
})();