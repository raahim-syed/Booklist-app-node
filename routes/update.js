const express = require("express");
const mysql = require("mysql")
const bodyParser = require("body-parser")

//Custom Modules
const query = require("../classes/Query")

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}))

//Database Connection
//Wrting database related information and creating connection
let dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "booklist_app"
  });

  //Making the connection
  dbConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Gettting and displaying the values of the book to be edited
router.get("/:isbn", (req, res) =>{
    console.log(req.params.isbn)
    const queryString = `SELECT * FROM book WHERE book.isbn = ${req.params.isbn}`;
  
    query(dbConnection, queryString).then(rows => {
        // console.log(rows[0])
        
      //Store Query Results and return
      res.render("update", {data: rows[0]});
    })
});

//Editting book in db and redirecting
router.post("/:isbn", (req, res) => {
  // console.log(req.body)
    const {title, author, isbn} = req.body;
    const queryString = `UPDATE book SET book.bookName = "${title}", book.author = "${author}", book.isbn = ${isbn} WHERE book.isbn = ${req.params.isbn}; `;
  
    query(dbConnection, queryString).then(rows => {
      
      //Redirect After Query is run
      res.redirect("/")
    }) 
})


module.exports = router;