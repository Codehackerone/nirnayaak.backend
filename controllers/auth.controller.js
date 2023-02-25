const User = require('../models/user.model')
const fs = require('fs')
const path = require('path')

const postLogin = (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({ email, password })
        .then((user) => {
            if (!user) {
                return res.status(404).send('user not found')
            }
            res.status(200).send(user)
        })
}

const postRegister = (req, res, next) => {
    let name = req.body.name
    let password = req.body.password
    let licenseID = req.body.licenseID
    let email = req.body.email
    let designation = req.body.designation
    
    // var img = fs.readFileSync(req.file.path);
    // var encode_img = img.toString('base64');
    // var final_img = {
    //     contentType:req.file.mimetype,
    //     image:new Buffer(encode_img,'base64')
    // };

    let user = new User({
        licenseID,
        name,
        email,
        password,
        designation,
        // file: final_img
    })

    user.save()
        .then((user) => {
            if(!user) {
                return res.status(404).send('error')
            }

            res.status(200).send(user)
        })

}

const getDocument = (req, res) => {

    User.findOne({licenseID: req.params.id})
    .then((user) => {
        if(!user) {
            return res.status(404).send('error')
        }
        res.status(200).send(user)
    })
}

module.exports = {
    postLogin,
    postRegister,
    getDocument
}