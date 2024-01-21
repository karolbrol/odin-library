const myLibrary = [];
const tableBody = document.querySelector('table.book-table tbody');
const modal = document.querySelector('.modal');
const addBookBtn = document.querySelector('#add-book-btn');
const addBookForm = modal.querySelector('#add-book-form');
const modalAddBtn = modal.querySelector('#modal-add-btn');
const modalCancelBtn = modal.querySelector('#modal-cancel-btn');


// Adding book events
addBookBtn.addEventListener('click', () => {
  modal.showModal();
});

addBookForm.addEventListener('submit', (event) => {
  const inputs = getInputs(addBookForm);
  addBookToLibrary(inputs.title, inputs.author, inputs.pages, inputs.read);
  addBookForm.reset();
  updateBooksDisplay();
});

modal.addEventListener('click', (event) => {
  const modalDimensions = modal.getBoundingClientRect();
  if (  // Click outside modal or on cancel button
    event.clientX < modalDimensions.left ||
    event.clientX > modalDimensions.right ||
    event.clientY < modalDimensions.top ||
    event.clientY > modalDimensions.bottom ||
    event.target === modalCancelBtn
  ) {
    addBookForm.reset();
    modal.close();
  }
});

// Managing books events: toggle and delete
tableBody.addEventListener('click', (event) => {
  const element = event.target
  if (element.tagName !== 'BUTTON') {
    return;
  };

  const index = parseInt(element.closest('tr').dataset.index, 10);

  switch (element.dataset.action) {
    case 'toggle':
      myLibrary[index].toggleRead();
      break;
    case 'delete':
      myLibrary.splice(index, 1);
      break;
  }
  updateBooksDisplay();
})


class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
    return this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function updateBooksDisplay() {
  while (tableBody.lastElementChild) {
    tableBody.removeChild(tableBody.lastElementChild);
  }

  for (let i = 0 ; i < myLibrary.length; i++) {
    // Add each library element to the table
    const book = myLibrary[i];
    const title = document.createElement('td');
    title.textContent = book.title;
    const author = document.createElement('td');
    author.textContent = book.author;
    const pages = document.createElement('td');
    pages.textContent = book.pages;

    const read = document.createElement('td');
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.dataset.action = 'toggle';
    toggleBtn.textContent = book.read ? 'Yes' : 'No';
    toggleBtn.className = book.read ? 'toggle-btn read': 'toggle-btn';
    read.appendChild(toggleBtn);

    const deleteTd = document.createElement('td');

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.dataset.action = 'delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'DEL';
    deleteTd.appendChild(deleteBtn);

    const row = document.createElement('tr');
    row.dataset.index = i;  // Array index to link row with correct array element
    row.append(title, author, pages, read, deleteTd);
    tableBody.appendChild(row);
  }
}

// function returns object with key: values of all forms inputs
function getInputs(form) {
  const inputs = form.querySelectorAll('input');
  let values = {};
  for (const input of inputs) {
    if (input.type === 'checkbox') {
      values[input.name] = input.checked;
      continue;
    }
    values[input.name] = input.value;
  }
  return values;
}