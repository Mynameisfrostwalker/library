let myLibrary = [];
let title;
let author;
let length;
let checked;
const main = document.querySelector('main');
const form = document.querySelector('form')
const formcontainer = document.querySelector('div#form')

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

function createCard() {
    console.log(myLibrary)
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
        if (myLibrary[i].bookstatus === 'complete') {
            para4.classList.add('Completebutton');
            para4.textContent = `Completed`
        } else {
            para4.classList.add('Incompletebutton');
            para4.textContent = `Incomplete`
        }
        statusInfo.appendChild(para4);
        book.appendChild(statusInfo);
        main.insertBefore(book, formcontainer);
        console.log(main)
    }
}

function addBookToLibrary() {
    myLibrary.push(new Book(title, author, length, checked));
    createCard();
}

function input(event) {
    title = form.elements['title'].value;
    author = form.elements['author'].value;
    length = form.elements["pages"].value;
    form.elements["status"].forEach(radio => {
        if (radio.checked) {
            checked = radio.value
        }
    })
    addBookToLibrary()
    form.style.display = 'none';
    return false;
}

form.addEventListener('submit', input)