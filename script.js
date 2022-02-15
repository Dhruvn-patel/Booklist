// Book class repersennt For Books
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI class
class UI {
    //displaybooks
    static displayBook() {
        //object of array
        const storeBook = Store.getBooks();
        //pass refernce to books
        const books = storeBook;
        //traval to add Book
        books.forEach((book) => UI.addBookList(book));
    }
    static addBookList(book) {
            const list = document.querySelector("#book-list");
            //create row using Dom
            const row = document.createElement("tr");
            //row in make column to display and button added
            row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger delete ">X</a></td>
        `;
            list.appendChild(row);
        }
        //clear form fields after addbook
    static clearfield() {
        document.getElementById("title").value = "";
        document.getElementById("Authorname").value = "";
        document.getElementById("ISBN").value = "";
    }

    //deleteBook
    static deleteBook(bookele) {
        //if contain books in row check 
        //classList contains classes like btn btn-danger so...
        if (bookele.classList.contains('delete')) {
            // console.log(bookele.classList);
            //means bookele.parentElement==td
            // bookele.parentElement.parentElement means row so that remove row
            bookele.parentElement.parentElement.remove();
        }
    }

    //show Alert
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        //write message inside div
        div.appendChild(document.createTextNode(message));
        //parent element for message 
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        // insert before form element
        container.insertBefore(div, form);

        //vanish after 3 sec
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }
}

//Store class:handles storage store into local storage and delete it
class Store {

    static getBooks(book) {
        let books;
        if (localStorage.getItem("books") == null) {
            books = [];
        } else {
            //parse convert web server text into object of array 
            // se the JavaScript function JSON.parse() to convert text into a JavaScript object:

            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book) {
            // added to store class 
            const books = Store.getBooks();
            books.push(book);
            // Use the JavaScript function JSON.stringify() to convert it into a string.
            localStorage.setItem("books", JSON.stringify(books));
        }
        //unique isbn 
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            //check remove based on isbn
            if (book.isbn == isbn) {
                //remove one 
                books.splice(index, 1);
            }
        });
        //remove items
        localStorage.setItem("books", JSON.stringify(books));
    }


}
//Event :display()
document.addEventListener("DOMContentLoaded", UI.displayBook);
//Event :add book()

document.querySelector("#book-form").addEventListener("submit", (event) => {
    //prevent actual submit
    event.preventDefault();

    //get value form
    const title = document.getElementById("title").value;
    const author = document.getElementById("Authorname").value;
    const isbn = document.getElementById("ISBN").value;

    //validate
    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please Fill up!", "danger");
    } else {

        //add to book UI class
        const newBook = new Book(title, author, isbn);
        UI.addBookList(newBook);

        //add local storage
        Store.addBook(newBook);

        //show Add message
        UI.showAlert("Book Added !", "success");


        //clearFields
        UI.clearfield();
    };
});
//Event :Remove book()

document.querySelector("#book-list").addEventListener('click', (event) => {

    UI.deleteBook(event.target);

    //remove books for storage
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);
    console.log(event.target.parentElement.previousElementSibling.textContent);
    //show Remove messages
    UI.showAlert("Book Removed !", "success");
});