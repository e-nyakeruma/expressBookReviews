const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true,}))

app.use("/customer/autho/*", function auth(req,res,next){
    //Write the authenication mechanism here
    console.log(req.session.auth)
    if(req.session){
        //const token = req.session.authorization['accessToken']
        if(token){
            const secretKey = "access"
            jwt.verify(token, secretKey, (error, user) => {
                if(!error){
                    req.user = user
                    next()
                } else {
                    console.log("2")
                    res.status(403).send("Unauthenticated")
                }
            })
        }
    } else {
        console.log('1')
        res.status(403).send("Unauthenticated")
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
