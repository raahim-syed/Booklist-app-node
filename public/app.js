//Form Elements
const title = document.querySelector("#title");
const author = document.querySelector("#title");
const isbn = document.querySelector("#isbn");
const form = document.querySelector("#book-form");

//Table Elements
const bookList = document.querySelector("#book-list")

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Static Class
class UI {
    static displayBooks(){
        let books = Storage.getFromStorage();
        let output = "";
        //Iterating and Printin Out Each Book
        books.forEach(book => {
            //Populating Output Variable with Data
            output += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="btn btn-danger btn-block delete" data="${book.isbn}">X</a>
            </tr>
            `
        });

        //Pushing to table
        bookList.innerHTML = output;
    }
}

class Storage{

    //Push to storage
    static addToStorage(data){
        let books;

        if(localStorage.getItem("books") == null){
            books = [];
        }
        books = JSON.parse(localStorage.getItem("books"));

        books.push(data);

        localStorage.setItem("books", JSON.stringify(books));            
    } 


    //Get Items from storage
    static getFromStorage(){
        return JSON.parse(localStorage.getItem("books")) == null ? [] : JSON.parse(localStorage.getItem("books"));
    }

    //Removing Elements
    static removeFromStorage(isbn){
        //Retreiving the books
        let books = this.getFromStorage();
        console.log(books)

        //Returing all those books which do not have that isbn
        books = books.filter(book => book.isbn != isbn);

        //Saving to storage Again
        this.addToStorage(books);
    }
}

//Displaying Books that in storage
document.onload = UI.displayBooks();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    //Book Object Which will be stored in an array
    const book = new Book(title.value, author.value, isbn.value);

    //Saving to Storage
    Storage.addToStorage(book);

    //Display Books
    UI.displayBooks();
});

//Delete Button Functionality
bookList.addEventListener("click", (e) => {
    //Because the link elements scrolls to the top of the page
    e.preventDefault();

    if(e.target.classList.contains("delete")){
        const isbn = e.target.getAttribute("data");
        console.log(isbn);
        //If isbn exists    
        if(isbn){
            //Removing From Storage
            Storage.removeFromStorage(isbn);
    
            //Display Books
            UI.displayBooks();
        }
    }
})