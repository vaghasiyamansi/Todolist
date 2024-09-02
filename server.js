require("dotenv").config()
const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ports = process.env.PORTS;
const server = express();
const passport = require('passport');
const session = require('express-session');
require('./config/passportlocal');
// View Engine configuration
server.set("view engine", "ejs");

// in-built middleware
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Session configuration
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

server.use(passport.initialize());
server.use(passport.session());

server.get("/", (req, res) => {
    res.render('login.ejs');
});
// server.get("/index", (req, res) => {
//     res.render('index.ejs');
// });


// User routes
const userRoutes = require("./routes/user.routes");
const profileRoutes= require("./routes/profile.routes");


server.use("/api/users", userRoutes);
server.use("/api/profile", profileRoutes);

server.listen(ports, () => {
    // Database connection
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log(`Database connected`))
        .catch(err => console.log(err))
    console.log(`server start http://localhost:${ports}`);
})