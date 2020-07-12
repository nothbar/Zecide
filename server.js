const express = require("express");

//set up express app
const app = express();

require('dotenv').config()
const bodyParser = require('body-parser');

//initialize routes
const routes = require('./routes/api');

const jwt = require('jsonwebtoken');
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//listen for requests
app.listen(PORT, function(){
    console.log("Server started at port 3000!");
})

var users = [
    {
        username: 'ankitanshu',
        password: 'xyz123',
        name: 'Ankitanshu',
        email: 'ankitanshu22@gmail.com'
    }, {
        username: 'anna',
        password: 'password123member',
        Name: 'Anna',
        email: 'anna@gmail.com'
    }
];

var newUser = {
    username: '',
    password: '',
    name: '',
    email: ''
}

const accessTokenSecret = process.env.SECRET_KEY;

app.post("/users/login", function(req,res){
    // Read username and password from request body
    const username = req.body.user.UserName;
    const password = req.body.user.password;
    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  name: user.name }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
    
});


app.post("/users", function(req,res){
    // Read name, email, username and password from request body
    const username = req.body.user.UserName;
    const password = req.body.user.password;
    const email = req.body.user.Email;
    const name = req.body.user.Name;

    newUser.username=username;
    newUser.password=password;
    newUser.email=email;
    newUser.name=name;

    users.push(newUser);

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  name: user.name }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
  
});
