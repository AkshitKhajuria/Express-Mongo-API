const userModel = require('../model/userModel');
var bcrypt = require('bcrypt');

function loginUser(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    if(email.length===0){
      res.status(400).send({message:"Please provide an email."})
    }
    if(password.length===0){
      res.status(400).send({message:"Please provide a password."})
    }

    userModel.findOne({ 'email': email}).then(doc=>{
      const hash = doc.password;
      bcrypt.compare(password,hash)
      .then(result=>{
        if(result){
          res.status(200).send({message:"Login sucessful"});
        }
        else{
          res.status(400).send({message:"Invalid password."});
        }
      })
      .catch(err=>console.log(err));
    })
    .catch(err=>{
      res.status(400).send({message:"No such user."})
    })
  }
  module.exports = {loginUser};