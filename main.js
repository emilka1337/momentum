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
            if (minutes < 10) {
                document.getElementById('clocks').innerHTML = `${hours - 12}:0${minutes}`;
            } else {
                document.getElementById('clocks').innerHTML = `${hours - 12}:${minutes}`;
            }
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

function createElement(...elems) {
    let elemsArray = [];

    for (let elem of elems) {
        elem = document.createElement(elem);
        elemsArray.push(elem);
    }

    return elemsArray;
}

function setStyles(elem, ...styles) {
    if (typeof(elem) == 'string') {
        elem = document.querySelector(elem);

        if (elem.length >= 0) {
            for (let className of elem) {
                for (let i = 0; i < styles.length; i += 2) {
                    if (i % 2 == 0) {
                        className.style[styles[i]] = styles[i + 1];
                    }
                }
            }
            return;
        }
    }

    for (let i = 0; i < styles.length; i++) {
        if (i % 2 == 0) {
            elem.style[styles[i]] = styles[++i];
        }
    }

    return elem;
}

function ChangeBackground() {
    let date = new Date;
    let month = date.getDate();
    document.getElementById('body').style.backgroundImage = `url(./img/${month}.jpg)`;
}

$("#settings").click(function () {
    $("#settings-menu").toggle(200);
})

//#region Main Focus
function addMainFocus() {
    let date = new Date;
    let focus = document.getElementById('focusInput').value;
    if (focus.length > 50) {
        alert('Focus length is too long... Max length is 50 symbols');
        document.getElementById('focusInput').value = '';
        return;
    }
    let day = date.getDate();
    let mainFocus = {
        'focus': focus,
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
    localStorage.setItem('mainFocusChecked', 0);
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
//#endregion

//#region Quote and Mantra
function setQuote() {                   // Установить цитату
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
        {
            quote: "“There are always limits, and there are always opportunities. The ones we rehearse and focus on are the ones that shape our attitude and our actions.”",
            author: "Seth Godin"
        },
        {
            quote: "“Progress is impossible without change, and those who cannot change their minds cannot change anything.”",
            author: "George Bernard Shaw"
        },
        {
            quote: "“Opportunities to find our deeper powers come when life seems most challenging.”",
            author: "Joseph Campbell"
        },
        {
            quote: "“Be focused. Be determined. Be hopeful. Be empowered.”",
            author: "Michelle Obama "
        },
        // {
        //     quote: "",
        //     author: ""
        // }
    ];
    let random = getRandom(0, quotes.length);

    setStyles('#quote', 'opacity', '0');
    setStyles('#quoteAuthor', 'opacity', '0');
    setTimeout(() => {
        document.getElementById('quote').innerText = quotes[random].quote;
        document.getElementById('quoteAuthor').innerText = quotes[random].author;
        setStyles('#quote', 'opacity', '1');
        setStyles('#quoteAuthor', 'opacity', '1');
    }, 300);
} setQuote();

function setMantra() {                  // Установить мантру
    let username = localStorage.getItem('username');

    let mantras = [
        'Greeting',
        'Be yourself.',
        'Be present.',
        'Be kind to yourself.',
        'Spread your wings.',
        'Smile, breath and go slowly.',
        `Be gentle to yousrself, ${username}`,
        'Remember who you are.',
    ];

    let random = getRandom(0, mantras.length);
    let mantra = mantras[random];
    setStyles('#mantra', 'opacity', '0');

    setTimeout(() => {
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

        setStyles('#mantra', 'opacity', '1');
    }, 300);

} setMantra();
//#endregion

//#region Bookmarks
function addItemToBookmarks(name, url) {    // Записать закладку в "базу данных"
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

function addItemsToBookmarksButton() {      // Запрос ввода данных сайта для закладки
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

function pushItemToBookmarks(bookmark, index, imgLink) {    // Добавление закладки в панель закладок
    let linksList = document.getElementById('linksList');
    linksList.removeChild(document.getElementById('addBookmarkButton'));

    let [li, a, div, button, i] = createElement('li', 'a', 'div', 'button', 'i');   // Деструктурирующее присваивание

    setStyles(li, 'position', 'relative');
    li.id = `bookmark${index}`;
    li.onmouseover = () => { document.getElementById(`removeBookmark${index}`).style.opacity = 1 };
    li.onmouseleave = () => { document.getElementById(`removeBookmark${index}`).style.opacity = 0 };
    a.setAttribute('href', bookmark.url);
    div.innerHTML = `<img src = https://www.google.com/s2/favicons?domain=${imgLink} style="margin-right: 5px;"> ${bookmark.name}`;
    setStyles(div, 'padding', '1px 0px');
    button.setAttribute('value', index);
    button.id = `removeBookmark${index}`;

    setStyles(
        button,
        'float', 'right',
        'padding', '0px',
        'position', 'absolute',
        'top', '4.5px',
        'right', '10px',
        'zIndex', '1',
        'opacity', '0',
        'transition', '0.2s'
    );
    button.setAttribute('value', index);
    button.setAttribute('onclick', 'removeItemFromBookmarks(this.value)');
    i.className = 'fas fa-times';
    setStyles(i, 'color', '#ffffffb0');

    linksList.appendChild(li);
    li.appendChild(a);
    li.appendChild(button);
    a.appendChild(div);
    button.appendChild(i);
    linksList.appendChild(createAddBookmarkButton());
}

function createAddBookmarkButton() {            // Создание кнопки "Добавить закладку"
    let button = document.createElement('button');
    button.id = 'addBookmarkButton';
    button.innerHTML = 'Add <i class="fas fa-plus"></i>';
    button.setAttribute('onclick', `addItemsToBookmarksButton()`);
    button.style.borderRadius = `5px`;

    return button;
}

function removeItemFromBookmarks(index) {       // Удаление закладки из списка и из "базы данных"
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('linksList').removeChild(document.getElementById(`bookmark${index}`));
}

$('#links').click(() => {
    $('#linksDropdown').toggle(200);
});
//#endregion

//#region Searchbar conditions
document.getElementById('search').onfocus = () => {
    document.getElementById('searchbar').style.opacity = '1';
    document.getElementById('searchbar').onmouseout = () => document.getElementById('searchbar').style.opacity = '1';
}
document.getElementById('search').onblur = () => {
    document.getElementById('searchbar').style.opacity = '0.3';
    document.getElementById('searchbar').onmouseover = () => document.getElementById('searchbar').style.opacity = '1';
    document.getElementById('searchbar').onmouseout = () => document.getElementById('searchbar').style.opacity = '0.3';
}
document.getElementById('searchButton').addEventListener('click', function (event) {
    event.preventDefault();

    let userQuery = document.getElementById('search').value;
    let query = 'https://www.google.com/search?q=';

    query += userQuery.split(' ').join('+');

    document.location.href = query;
});
document.getElementById('searchButton').addEventListener('keypress', function (event) {
    if (event.code == 'Enter') {
        event.preventDefault();

        let userQuery = document.getElementById('search').value;
        let query = 'https://www.google.com/search?q=';

        query += userQuery.split(' ').join('+');

        document.location.href = query;
    }
});
//#endregion

// #region ToDo
$('#toDoButton').click(() => {
    $('#toDo').toggle(200);
});

function createToDo() {                     // Запрос напоминания и сохранение в localStorage
    let toDoText = prompt('Введите напоминание');

    let toDo = {
        'text': toDoText,
        'checked': false
    };

    if (!toDoText) {
        return
    }

    if (!localStorage.getItem('todo')) {
        let toDos = [];
        toDos.push(toDo);
        localStorage.setItem('todo', JSON.stringify(toDos));
    } else {
        let toDos = JSON.parse(localStorage.getItem('todo'));
        toDos.push(toDo);
        localStorage.setItem('todo', JSON.stringify(toDos));
    }

    return toDo;
}

function createToDoItem(toDoText, index) {  // Создание элемента списка со всеми стилями
    let [li, input, p, button, i] = createElement('li', 'input', 'p', 'button', 'i');

    li.id = `toDo${index}`;
    li.className = 'todo-item';
    li.setAttribute('onmouseover', `document.getElementById('removeToDo${index}').style.opacity = '1';`);
    li.setAttribute('onmouseout', `document.getElementById('removeToDo${index}').style.opacity = '0';`);

    input.setAttribute('type', 'checkbox');
    input.setAttribute('onclick', `checkToDo(this.checked, ${index})`);
    input.className = 'todo-checkbox'
    input.id = `toDoCheckbox${index}`;

    p.id = `toDoText${index}`;
    p.innerText = toDoText;
    setStyles(p,
        'display', 'inline',
        'color', 'white',
        'marginLeft', '5px'
    );

    button.setAttribute('value', index);
    button.setAttribute('onclick', `removeToDo(this.value)`);

    i.className = 'fas fa-times';
    i.id = `removeToDo${index}`;
    setStyles(i,
        'color', 'white',
        'opacity', '0',
        'transition', '300ms'
    );


    li.appendChild(input);
    li.appendChild(p);
    li.appendChild(button);
    button.appendChild(i);

    return li;
}

function pushToDoToList(toDoText, index) {  // Добавление элемента в список дел
    let toDoList = document.getElementById('toDoList');
    let li = createToDoItem(toDoText, index);

    toDoList.appendChild(li);
}

function createToDoButton() {            // Создание кнопки "Добавить напоминание"
    let button = document.createElement('button');
    let toDos = JSON.parse(localStorage.getItem('todo'));
    button.id = 'addToDo';
    button.innerHTML = 'Add <i class="fas fa-plus"></i>';
    button.setAttribute('onclick', `addNewToDo()`);
    button.onmouseover = () => document.getElementById('addToDo').style.opacity = '1';
    button.onmouseout = () => document.getElementById('addToDo').style.opacity = '0.8';
    setStyles(
        button,
        'borderRadius', '5px',
        'position', 'absolute',
        'transition', '300ms',
        'opacity', '0.7'
    )
    if (!toDos || !toDos[0]) {
        setStyles(
            button,
            'left', '90px',
            'bottom', '80px',
        );
    } else {
        setStyles(
            button,
            'left', '0',
            'bottom', '0',
        );
    }


    return button;
}

function addNewToDo() {                  // Создание нового напоминания
    let todo = createToDo();

    if (!todo) {
        return;
    }

    let toDos = JSON.parse(localStorage.getItem('todo'));

    setStyles(
        '#addToDo',
        'borderRadius', '5px',
        'position', 'absolute',
        'left', '0',
        'bottom', '0'
    )
    pushToDoToList(todo.text, toDos.length - 1);
}

function checkToDo(checked, index) {    // Проверка чекбоксов в ToDo списке
    let toDos = JSON.parse(localStorage.getItem('todo'));

    if (checked) {
        document.getElementById(`toDoText${index}`).style.textDecoration = 'line-through';
        toDos[index].checked = true;
    } else {
        document.getElementById(`toDoText${index}`).style.textDecoration = 'none';
        toDos[index].checked = false;
    }

    localStorage.setItem('todo', JSON.stringify(toDos))
}

function removeToDo(index) {            // Удаление элемента из списка ToDo и из localStorage
    let toDos = JSON.parse(localStorage.getItem('todo'));
    toDos.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(toDos));

    if (!toDos || !toDos[0]) {
        setStyles(
            '#addToDo',
            'borderRadius', '5px',
            'position', 'absolute',
            'left', '90px',
            'bottom', '80px',
            'transition', '300ms'
        );
    }
    document.getElementById('toDoList').removeChild(document.getElementById(`toDo${index}`));
}
//#endregion


setInterval(setTime, 1000);
setInterval(ChangeBackground(), 60000);
setInterval(setQuote, 30000);
setInterval(setMantra, 100000);

(function () {                                       // Проверка пользователя
    if (!localStorage.getItem('username')) {
        localStorage.setItem('username', prompt('Hi! Enter your name, please'));
    }
})();

(function () {                                      // Main focus
    let mainFocus = JSON.parse(localStorage.getItem('mainFocus'));
    let date = new Date;

    if (mainFocus && date.getDate() == mainFocus.day) {
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

(function () {                                      // Динамичная генерация ToDo-листа
    let toDos = JSON.parse(localStorage.getItem('todo'));
    let counter = 0;

    if (toDos) {
        for (let todo of toDos) {
            pushToDoToList(todo.text, counter);
            counter++;
        }
    }

    document.getElementById('toDo').appendChild(createToDoButton());
}());

(function () {                                      // Проверка чекбоксов в ToDo-листе
    let checkboxes = document.getElementsByClassName('todo-checkbox');
    let toDos = JSON.parse(localStorage.getItem('todo'))
    let index = 0;

    if (toDos) {
        for (let todo of toDos) {
            if (todo.checked) {
                checkboxes[index].checked = true;
                document.getElementById(`toDoText${index}`).style.textDecoration = 'line-through';
            }
            index++;
        }
    }
}());
