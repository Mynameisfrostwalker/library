let myLibrary = [...JSON.parse(localStorage.getItem('library'))];
let title;
let author;
let length;
let checked;
const main = document.querySelector('main');
const form = document.querySelector('form')
const formcontainer = document.querySelector('div#form')
const addBook = document.querySelector('div.addbook')

function Book(name, creator, pages, status) {
    this.title = name;
    this.author = creator;
    this.bookLength = pages;
    this.bookstatus = status;
    this.info = function() {
        return `${this.title} was authored by ${this.author}. 
        ${this.title} is ${this.bookLength} pages long and has ${this.readStatus}`
    }
}

function columnSetter() {
    for (let j = 0; j <= main.children.length; j++) {
        if (main.children.length > (4 * j)) {
            main.style['grid-template-rows'] = `repeat(${j + 2}, 1fr)`
        }
    }
}

function createCard() {
    for (let i = 0; i < myLibrary.length; i++) {
        const book = document.createElement('div');
        book.classList.add('book');
        const mainInfo = document.createElement('div');
        mainInfo.classList.add('main-info');
        const para1 = document.createElement('p');
        para1.textContent = `${myLibrary[i].title}`;
        mainInfo.appendChild(para1);
        const para2 = document.createElement('p');
        para2.textContent = `${myLibrary[i].author}`;
        mainInfo.appendChild(para2);
        book.appendChild(mainInfo);
        const statusInfo = document.createElement('div');
        statusInfo.classList.add('status-info');
        const para3 = document.createElement('p');
        para3.classList.add('redbutton')
        para3.textContent = `Remove?`;
        statusInfo.appendChild(para3);
        const para4 = document.createElement('p');
        if (myLibrary[i].bookstatus === 'has been completed') {
            para4.classList.add('Completebutton');
            para4.textContent = `Completed`
        } else {
            para4.classList.add('Incompletebutton');
            para4.textContent = `Incomplete`
        }
        statusInfo.appendChild(para4);
        book.appendChild(statusInfo);
        book.setAttribute('data-key', `${i}`)
        main.insertBefore(book, formcontainer);
        columnSetter()
    }
    document.querySelectorAll('.redbutton').forEach(button => {
        button.addEventListener('click', remove)
    })
    document.querySelectorAll('.Incompletebutton').forEach(button => {
        button.addEventListener('click', change)
    })
    document.querySelectorAll('.Completebutton').forEach(button => {
        button.addEventListener('click', change)
    })

}

function addBookToLibrary() {
    myLibrary.push(new Book(title, author, length, checked));
}

function input() {
    title = form.elements['title'].value;
    author = form.elements['author'].value;
    length = form.elements["pages"].value;
    form.elements["status"].forEach(radio => {
        if (radio.checked) {
            checked = radio.value
        }
    })
    addBookToLibrary()
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

form.addEventListener('submit', input)

addBook.onclick = function() {
    formcontainer.classList.add('visible')
}

createCard()

function removePrevCards() {
    let realLength = main.children.length
    for (let k = 0; k < realLength; k++) {
        console.log(k)
        if (main.children[1].classList.value === 'book') {
            console.log(k)
            main.children[1].remove()
        }
    }
}

function remove(event) {
    let index = parseInt(event.target.parentNode.parentNode.attributes['data-key'].value);
    let got = JSON.parse(localStorage.getItem('library'))
    let newlib = [...got.slice(0, index), ...got.slice(index + 1)]
    localStorage.setItem('library', JSON.stringify(newlib))

    myLibrary = [...myLibrary.slice(0, index), ...myLibrary.slice(index + 1)]
    console.log(myLibrary)
    console.log(localStorage.getItem('library'))
    removePrevCards()
    createCard()
}

document.querySelectorAll('.redbutton').forEach(button => {
    button.addEventListener('click', remove)
})

function change(event) {
    let index = parseInt(event.target.parentNode.parentNode.attributes['data-key'].value)
    if (event.target.classList.value === 'Completebutton') {
        let got = JSON.parse(localStorage.getItem('library'))
        got[index].bookstatus = 'has not been completed'
        localStorage.setItem('library', JSON.stringify(got))

        myLibrary[index].bookstatus = 'has not been completed'
        removePrevCards()
        createCard()
    } else {
        let got = JSON.parse(localStorage.getItem('library'))
        got[index].bookstatus = 'has been completed'
        localStorage.setItem('library', JSON.stringify(got))

        myLibrary[index].bookstatus = 'has been completed'
        removePrevCards()
        createCard()
    }
}

document.querySelectorAll('.Completebutton').forEach(button => {
    button.addEventListener('click', change)
})

document.querySelectorAll('.Incompletebutton').forEach(button => {
    button.addEventListener('click', change)
})