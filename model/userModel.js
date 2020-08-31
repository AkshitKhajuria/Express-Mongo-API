const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{ type: String, match: /[A-Za-z]/ },
    lname:{ type: String, match: /[A-Za-z]/ },
    'email':{type: String, unique: true, require: true, lowercase: true},
    'password':String
});

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;