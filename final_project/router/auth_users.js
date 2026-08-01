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
        jwt.sign()

        return res.status(200).send(`${username} successfully`)
    } else {
        return res.status(300).json("User not found");
    }
  } else {
    return res.status(300).json("Username or password is missing");
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
