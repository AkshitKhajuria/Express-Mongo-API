var express = require('express');
var router = express.Router();

var registerController = require('../Controller/registerUser');
var loginUser = require('../Controller/loginUser');
var updateController = require('../Controller/updateUser');

/* GET users listing. */
router.post('/register',
  registerController.nullCheck,
  registerController.validEmail,
  registerController.userExists,
  registerController.registerUser);

router.get('/login',registerController.validEmail, loginUser.loginUser);

router.patch('/update/:id',registerController.validEmail, updateController.updateName);

module.exports = router;
