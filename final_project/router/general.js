const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


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
  //return res.status(200).send(JSON.stringify(books, null, 3));
  //list books using promise
    let booksPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({
                success: true,
                status: 200,
                data: JSON.stringify(books, null, 3)
            })
        },2000)})

    booksPromise.then((data) => {
        return res.status(data.status).send(data.data);
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    //   const book = books[req.params.isbn]
    //   if(book){
    //     return res.status(200).send(JSON.stringify(book, null, 3));
    //   } else {
    //     return res.status(404).send("Book not found")
    //   }

    let bookPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        const book = books[req.params.isbn]
        if(book){
            resolve({
                success: true,
                status: 200,
                data: JSON.stringify(book, null, 3)
            })
        } else {
            resolve({
                success: false,
                status: 404,
                data: "Book not found"
            })
        }
    },2000)})

    bookPromise.then((data) => {
        return res.status(data.status).send(data.data);
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    //   booksArr = Object.values(books)

    //   if(req.params.author){
    //     const book = booksArr.find((book) => book.author === req.params.author)
    //     if(book){
    //         return res.status(200).send(JSON.stringify(book, null, 3));
    //     } else {
    //         return res.status(404).json("Book not found");   
    //     }
    //   } else {
    //     return res.status(300).json("Author not found");
    //   }

    let bookPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        booksArr = Object.values(books)
        if(req.params.author){
            const book = booksArr.find((book) => book.author === req.params.author)
            if(book){
                resolve({
                    success: true,
                    status: 200,
                    data: JSON.stringify(book, null, 3)
                })
            } else {
                resolve({
                    success: false,
                    status: 404,
                    data: "Book not found"
                })
            }
        } else {
            resolve({
                success: false,
                status: 404,
                data: "Author not found"
            })
        }
    },2000)})

    bookPromise.then((data) => {
        return res.status(data.status).send(data.data);
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    // booksArr = Object.values(books)
  
    // if(req.params.title){
    //     const book = booksArr.find((book) => book.title === req.params.title)
    //     if(book){
    //         return res.status(200).send(JSON.stringify(book, null, 3));
    //     } else {
    //         return res.status(404).json("Book not found");   
    //     }
    // } else {
    //     return res.status(404).json("Title not found");
    // }

    let bookPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        booksArr = Object.values(books)
        if(req.params.title){
            const book = booksArr.find((book) => book.title === req.params.title)
            if(book){
                resolve({
                    success: true,
                    status: 200,
                    data: JSON.stringify(book, null, 3)
                })
            } else {
                resolve({
                    success: false,
                    status: 404,
                    data: "Book not found"
                })
            }
        } else {
            resolve({
                success: false,
                status: 404,
                data: "Title not found"
            })
        }
    },2000)})

    bookPromise.then((data) => {
        return res.status(data.status).send(data.data);
    })
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
