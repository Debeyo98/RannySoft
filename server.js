//Bring in dependencies/Modules
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Store = require("./models/store").Store;
const logger = require("morgan");
const flash = require("connect-flash");

// Define express function
const app = express();
const PORT = 8000;

// Configure mongoose to connect to database
mongoose.connect("mongodb://localhost/rannysoftapp", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then( (response) => {
    console.log("Rannysoft database connected successfully");
}).catch( (error) => {
    console.log(error);
});

//Configuring Express App 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Configure logger
app.use(logger('dev'));
app.use(flash());

//Configure EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Home route
app.get("/", (req, res) => {
    // res.send("This is the homepage!!!!!!");
    res.render("index.ejs");
});

// About Route
app.get("/about", (req, res) => {
    res.render("about.ejs");
});
// Register GET Route
app.get("/register", (req, res) => {
    res.render("register.ejs");
});
// Register POST Route
app.post("/register", (req, res) => {
    // console.log(req.body);

    let {
        store_name,
        email,
        password,
        confirm_password,
        address,
        phone_number } = req.body;
    
    if(password.length <= 5) {
    if(password != confirm_password) {
        console.log("Passwords do not match!");
        res.redirect("/register");
    }else {
        const newStore = new Store({
            store_name: store_name,
            email: email,
            password: password,
            phone_number: phone_number,
            address: address
        });
    
        newStore.save();
        res.redirect("/register");
    }
    }else{
        console.log("Password is less than 5 characters");
    }

});


app.listen(PORT, () => {
    console.log(`Server started on port:::: ${PORT}`)
});