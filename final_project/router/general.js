const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  //Write your code here
  let username = req.body.username
  let password = req.body.password

  if(username && password){
    if(isValid(username)){
        users.push({
            username: username, password: password
        })

        return res.status(200).send(`${username} successfully`)
    } else {
        return res.status(300).json("Username already exists");
    }
  } else {
    return res.status(300).json("Username or password is missing");
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books, null, 3));
});

// Get the book list available in the shop via axios
public_users.get('/axios',function (req, res) {
    const allBooks = async () => {
        try {
            await axios.get('http://localhost:5000/')
            .then(response => {
                const data = response.data;
                console.log(data)
                return res.status(200).send(JSON.stringify(data, null, 3));
            })
            .catch(error => {
                console.error("Axios Error:", error);
                return res.status(error.response.status).send(error.response.data)
            });
        } catch (error) {
          console.error("Error:", error);
        }
    };

    allBooks()
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn
    const book = books[req.params.isbn]
    if(book){
        return res.status(200).send(JSON.stringify({[isbn]: book}, null, 3));
    } else {
        return res.status(404).send("Book not found")
    }
});

// Get book details based on ISBN via axios
public_users.get('/axios/isbn/:isbn',function (req, res) {
    const isbnBooks = async () => {
        try {
            await axios.get('http://localhost:5000/isbn/' + req.params.isbn)
            .then(response => {
                const data = response.data;
                console.log(data)
                return res.status(response.status).send(JSON.stringify(data, null, 3));
            })
            .catch(error => {
                console.error("Axios Error:", error.message);
                return res.status(error.response.status).send(error.response.data)
            });
        } catch (error) {
          console.error("Error:", error);
        }
    };

    isbnBooks()
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    booksArr = Object.values(books)
    if(req.params.author){
        let isbn = null
        const book = booksArr.find((book, index) => {
            if(book.author === req.params.author){
                isbn = index + 1
                return book
            }
        })
        if(book){
            return res.status(200).send(JSON.stringify({[isbn]: book}, null, 3));
        } else {
            return res.status(404).json("Book not found");   
        }
    } else {
        return res.status(300).json("Author not found");
    }
});

// Get book details based on author via axios
public_users.get('/axios/author/:author',function (req, res) {
    const authorBooks = async () => {
        try {
            await axios.get('http://localhost:5000/author/' + req.params.author)
            .then(response => {
                const data = response.data;
                console.log(data)
                return res.status(response.status).send(JSON.stringify(data, null, 3));
            })
            .catch(error => {
                console.error("Axios Error:", error);
                return res.status(error.response.status).send(error.response.data)
            });
        } catch (error) {
          console.error("Error:", error);
        }
    };

    authorBooks()
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    booksArr = Object.values(books)
    if(req.params.title){
        let isbn = null
        const book = booksArr.find((book, index) => {
            if(book.title === req.params.title){
                isbn = index + 1
                return book
            }
        })
        if(book){
            return res.status(200).send(JSON.stringify({[isbn]: book}, null, 3));
        } else {
            return res.status(404).json("Book not found");   
        }
    } else {
        return res.status(404).json("Title not found");
    }
});

// Get all books based on title via axios
public_users.get('/axios/title/:title',function (req, res) {
    //Write your code here
    const titleBooks = async () => {
        try {
            await axios.get('http://localhost:5000/title/' + req.params.title)
            .then(response => {
                const data = response.data;
                console.log(data)
                return res.status(response.status).send(JSON.stringify(data, null, 3));
            })
            .catch(error => {
                console.error("Axios Error:", error);
                return res.status(error.response.status).send(error.response.data)
            });
        } catch (error) {
          console.error("Error:", error);
        }
    };

    titleBooks()
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  const bookDetails = books[isbn]
  if(bookDetails){
    const reviews = bookDetails.reviews
    return res.status(200).send(JSON.stringify(reviews, null, 3));
  } else {
    return res.status(404).json("Book not found");
  }
});

module.exports.general = public_users;
