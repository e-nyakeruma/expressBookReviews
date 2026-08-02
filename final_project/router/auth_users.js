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
    const userFound = users.find((user) => user.username === username && user.password === password)
    if(userFound){
        return true
    } else {
        return false
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username = req.body.username
  let password = req.body.password

  if(username && password){
    const userAuthenticated = authenticatedUser(username, password)
    if(userAuthenticated){
        const secretKey = "access"
        let accessToken = jwt.sign({data: password}, secretKey, {expiresIn: 3600})
        
        req.session.auth = {
            accessToken, username
        }

        console.log(req.session)

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
        if (Object.keys(book.reviews).length == 0) {
            console.log("Initial entry")
            book.reviews = [{
                username: username, content: review
            }]

            books[isbn] = book

            console.log("Review added: ", books[isbn])

            return res.status(200).send("Review added: " + JSON.stringify(books[isbn], null, 4)); 
        } else {
            userReview = book.reviews.find((review) => review.username === username)
            if(userReview){
                console.log("Update review by " + username)
                userReview.content = review
            } else {
                console.log("Add a new review by " + username)
                book.reviews.push({
                    username: username, content: review
                })
            }

            books[isbn] = book

            console.log("Review updated: ", books[isbn])

            return res.status(200).send("Review updated: " + JSON.stringify(books[isbn], null, 4)); 
        }
    } else {
        return res.status(300).send("Review not found"); 
    }
  } else {
    return res.status(404).send("Book not found");
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn = req.params.isbn
    const book = books[isbn]
    const username = req.user
    if(book){
        if (Object.keys(book.reviews).length > 0) {
            userReviews = book.reviews.filter((review) => review.username !== username)
            if(userReviews){
                console.log("Deleted reviews by " + username)
                console.log(userReviews)
                book.reviews = userReviews
            } 

            books[isbn] = book

            console.log("Review deleted: ", books[isbn])

            return res.status(200).send("Review deleted: " + JSON.stringify(books[isbn], null, 4)); 
        } else {
            return res.status(300).send("Reviews not found");
        }
    } else {
      return res.status(404).send("Book not found");
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
