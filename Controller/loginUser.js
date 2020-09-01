const userModel = require('../model/userModel');
var bcrypt = require('bcrypt');

async function loginUser(req, res, next) {
  const {email,password} = req.body;
  // null check
  if (email.length === 0) {
    res.status(400).send({ message: "Please provide an email." })
  }
  if (password.length === 0) {
    res.status(400).send({ message: "Please provide a password." })
  }

  try {
    const user = await userModel.findOne({ 'email': email })
    const hash = user.password;
    const match = await bcrypt.compare(password, hash);
    if (match) {
      res.status(200).send({ message: "Login sucessful" });
    }
    else {
      res.status(400).send({ message: "Invalid password." });
    }
  }
  catch (err) {
    res.status(400).send({ message: "No such user." })
  }
}

module.exports = { loginUser };