const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books, null, 3));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const book = books[req.params.isbn]
  if(book){
    return res.status(200).send(JSON.stringify(book, null, 3));
  } else {
    return res.status(404).send("Book not found")
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  booksArr = Object.values(books)
  
  if(req.params.author){
    const book = booksArr.find((book) => book.author === req.params.author)
    if(book){
        return res.status(200).send(JSON.stringify(book, null, 3));
    } else {
        return res.status(404).json("Book not found");   
    }

  } else {
    return res.status(300).json("Author not found");
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  booksArr = Object.values(books)
  
  if(req.params.title){
    const book = booksArr.find((book) => book.title === req.params.title)
    if(book){
        return res.status(200).send(JSON.stringify(book, null, 3));
    } else {
        return res.status(404).json("Book not found");   
    }

  } else {
    return res.status(404).json("Title not found");
  }
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
