let myLibrary = [];

function book(title, author, length, status) {
    this.title = title;
    this.author = author;
    this.bookLength = length;
    this.readStatus = status;
    this.info = function() {
        return `${this.title} was authored by ${this.author}. 
        ${this.title} is ${this.bookLength} pages long and has ${this.readStatus}`
    }
}

function addBookToLibrary() {

}