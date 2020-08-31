var userModel = require('../model/userModel');
var validator = require("email-validator");
var bcrypt = require('bcrypt');
const saltRounds = 10;

function validEmail(req, res, next) {
    const email = req.body.email;
    if (validator.validate(email)) {
        next();
    }
    else {
        res.status(400).send({ message: "Invalid email." });
    }
}

function nullCheck(req, res, next) {
    var { fname, lname, email, password } = req.body;
    try {
        if (fname.length === 0) {
            throw new Error("Please provide a first name.");
        }
        else if (lname.length === 0) {
            throw new Error("Please provide a last name.");
        }
        else if (password.length === 0) {
            throw new Error("Please provide a password.");
        }
        else if (email.length === 0) {
            throw new Error("Please provide an email address.");
        }
        else {
            next()
        }
    } catch (error) {
        res.status(400).send({ message: `${error}` })
    }
}

function registerUser(req, res, next) {
    var { fname, lname, email, password } = req.body;
    if (fname.length === 0) {
        res.status(400).send({ message: "Please provide a first name." });
    }
    else if (lname.length === 0) {
        res.status(400).send({ message: "Please provide a last name." });
    }
    else if (password.length === 0) {
        res.status(400).send({ message: "Please provide a password" });
    }
    else {
        //hash the password
        bcrypt.hash(password, saltRounds)
            .then(hashval => {
                let new_user = new userModel({
                    'fname': fname,
                    'lname': lname,
                    'email': email,
                    'password': hashval
                });
                new_user.save()
                    .then(doc => res.status(201).send({ message: "User created sucessfully." }))
                    .catch(err => res.status(500).send({ message: "Err! Unable to create user." }));
            })
            .catch(err => res.status(500).send({ message: "Error creating password." }));
    }
}

function userExists(req, res, next) {
    const email = req.body.email;
    userModel.find({ 'email': email }, (err, doc) => {
        if (err) {
            res.status(500).send({ message: "An error occured." });
        }
        else if (doc.length > 0) {
            res.status(409).send({ message: "User already exists." });
        }
        else {
            next();
        }
    })
}

module.exports = { validEmail, userExists, registerUser, nullCheck };