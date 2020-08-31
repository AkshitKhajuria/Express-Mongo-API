var userModel = require('../model/userModel');

function updateName(req, res, next) {
    const id = req.params.id;
    const { fname, lname } = req.body;
    
    userModel.updateOne({ _id: id },
        {
            $set:
            {
                fname: fname,
                lname: lname
            }
        })
        .then(doc => {
            console.log(doc);
            res.status(200).send({ message: "User name updated." });
        })
        .catch(err => {
            res.status(500).send({ message: "Id not found." });
        });
}

module.exports = { updateName };