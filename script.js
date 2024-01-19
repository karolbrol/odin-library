const myLibrary = [
  new Book('nazwa1', 'autor1', 100, false),
  new Book('nazwa3', 'autor1', 100, false),
  new Book('nazwa4', 'autor1', 100, false),
  new Book('nazwa2', 'autor2', 200, true)
];
const tableBody = document.querySelector('table.book-table tbody');
const modal = document.querySelector('.modal');
const addBookBtn = document.querySelector('#add-book-btn');
const addModalBtn = document.querySelector('#add-modal-btn');
const cancelModalBtn = document.querySelector('#cancel-modal-btn');

addBookBtn.addEventListener('click', () => { modal.showModal() });
addModalBtn.addEventListener('click', () => {});
cancelModalBtn.addEventListener('click', () => { modal.close() });


function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
  myLibrary.push(new Book(name, author, pages, read));
}

function updateBooksDisplay() {
  while (tableBody.lastElementChild) {
    tableBody.removeChild(tableBody.lastElementChild);
  }

  for (const book of myLibrary) {
    const name = document.createElement('td');
    name.textContent = book.name;
    const author = document.createElement('td');
    author.textContent = book.author;
    const pages = document.createElement('td');
    pages.textContent = book.pages;
    const read = document.createElement('td');
    read.textContent = book.read ? 'Yes' : 'No';

    const row = document.createElement('tr');
    row.append(name, author, pages, read);
    tableBody.appendChild(row);
  }
}