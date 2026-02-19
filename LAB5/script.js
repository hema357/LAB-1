let xmlDoc;

// Load XML using AJAX
function loadXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);
    xhr.onload = function () {
        if (this.status === 200) {
            xmlDoc = this.responseXML;
            displayBooks();
        }
    };
    xhr.send();
}

// Display books in table
function displayBooks() {
    const tableBody = document.querySelector("#bookTable tbody");
    tableBody.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const availability = books[i].getElementsByTagName("availability")[0].textContent;

        const row = `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${availability}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    }
}

// Validation
function validateFields(id, title, author, availability) {
    if (!id || !title || !author || !availability) {
        alert("All fields are required!");
        return false;
    }
    return true;
}

// Add Book
function addBook() {
    const id = document.getElementById("bookId").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const availability = document.getElementById("availability").value;

    if (!validateFields(id, title, author, availability)) return;

    const books = xmlDoc.getElementsByTagName("book");

    // Check duplicate ID
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            alert("Book ID already exists!");
            return;
        }
    }

    const newBook = xmlDoc.createElement("book");

    const idNode = xmlDoc.createElement("id");
    idNode.textContent = id;

    const titleNode = xmlDoc.createElement("title");
    titleNode.textContent = title;

    const authorNode = xmlDoc.createElement("author");
    authorNode.textContent = author;

    const availabilityNode = xmlDoc.createElement("availability");
    availabilityNode.textContent = availability;

    newBook.appendChild(idNode);
    newBook.appendChild(titleNode);
    newBook.appendChild(authorNode);
    newBook.appendChild(availabilityNode);

    xmlDoc.documentElement.appendChild(newBook);

    displayBooks();
    alert("Book added successfully!");
}

// Update Book
function updateBook() {
    const id = document.getElementById("bookId").value;
    const availability = document.getElementById("availability").value;

    if (!id || !availability) {
        alert("Enter Book ID and Availability!");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            books[i].getElementsByTagName("availability")[0].textContent = availability;
            displayBooks();
            alert("Book updated successfully!");
            return;
        }
    }

    alert("Book ID not found!");
}

// Delete Book
function deleteBook() {
    const id = document.getElementById("bookId").value;

    if (!id) {
        alert("Enter Book ID!");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            xmlDoc.documentElement.removeChild(books[i]);
            displayBooks();
            alert("Book deleted successfully!");
            return;
        }
    }

    alert("Book ID not found!");
}

// Load XML on page load
window.onload = loadXML;