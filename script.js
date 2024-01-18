const myLibrary = [
  new Book('nazwa1', 'autor1', 100, false),
  new Book('nazwa2', 'autor2', 200, true)
];
const tableBody = document.querySelector('table.book-table tbody');

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