const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    username = users.find((user) => user.username === username)
    if(username){
        return false
    } else {
        return true
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username = req.body.username
  let password = req.body.password

  if(username && password){
    const userFound = users.find((user) => user.username === username && user.password === password)
    if(userFound){
        const secretKey = "feekl0-jfwnfkenkfw-wefbwjefb"
        jwt.sign(userFound.username, secretKey, {expiresIn: 60 * 60}, (error, token) => {
            if(error){
                res.send("Erro occurred")
            }

            res.send(token)
        })

        return res.status(200).send(`${username} successfully logged in`)
    } else {
        return res.status(300).send("User not found");
    }
  } else {
    return res.status(300).send("Username or password is missing");
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn
  const review = req.query.review
  const book = books[isbn]
  const username = req.user
  if(book){
    if(review){
        findReviewByUser = book.reviews.find((review) => review.username === username)
        if(findReviewByUser){
            findReviewByUser.content = review
        } else {
            book.review = {
                username: username, content: review
            }
        }
    } else {
        return res.status(300).send("Review not found"); 
    }
  } else {
    return res.status(404).send("Book not found");
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
