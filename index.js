const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs")
const bodyParser = require("body-parser")
//Routers
const updateRouter = require("./routes/update")

//Custom Modules
const query = require("./classes/Query")

const port = process.env.PORT || 4000;

const app = express();

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

//Setting Up Router Middleware
app.use("/update", updateRouter);

//Setting up view engine
app.set("view engine","ejs");

//Middleware
app.use(express.static(__dirname + "/public"));
//Body Parser
app.use(express.urlencoded({extended: false}))

//Home Route
app.get("/", (req, res) => {
  const queryString = "SELECT * FROM book";
  
    query(dbConnection, queryString).then(rows => {

      //Store Query Results and return
      res.render("index", {data: rows});
    })
})

//Add Book Functionality
app.post("/add", (req, res) => {
  const {title, author, isbn} = req.body;
  const queryString = `INSERT INTO book VALUES(${isbn}, "${title}", "${author}");`;

  query(dbConnection, queryString).then(rows => {

    //Store Query Results and return
    res.redirect("/");
  }).catch(err => console.log(err));
})

//Delete Functionality
app.get("/delete/:isbn", (req, res) =>{
  const queryString = `DELETE FROM book WHERE book.isbn = ${req.params.isbn}`;

  query(dbConnection, queryString).then(rows => {
    //Store Query Results and return
    res.redirect("/");
  }).catch(err => console.log(err));
})

app.listen(port, () => console.log(`Server running on port: ${port}`))