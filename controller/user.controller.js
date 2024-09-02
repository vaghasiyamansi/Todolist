const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport')

// Registration

exports.showRegisterPage = async (req, res) => {
    try {
        res.render('register.ejs');   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        user = await User.create({ ...req.body, password: hashPassword });
        // user.save();
        // res.status(201).json({user,message:"User Registration successful"});
        res.redirect('/api/users/login');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.showLoginPage = async (req, res) => {
    try {
        res.render('login.ejs');   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.loginUser = passport.authenticate("local", {
    successRedirect: '/api/profile/',
    failureRedirect: '/api/users/login',
    failureFlash: true,
  });

exports.updateProfile= async (req,res) => {
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(
            user._id,
            {$set:req.body},
            {new:true}
        );
        res.status(202).json({user,message:"User update success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.deleteUser= async (req,res) => {
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(
            user._id,
            {isDelete: true},
            {new:true}
        );
        res.status(202).json({user,message:"User update success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

