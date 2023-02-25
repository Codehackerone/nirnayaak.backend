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
    

    let user = new User({
        licenseID,
        name,
        email,
        password,
        designation,
    })

console.log(user);

    user.save()
        .then((user) => {
            if(!user) {
                return res.status(404).send('error')
            }

            res.status(200).send(user)
        })

}

module.exports = {
    postLogin,
    postRegister
}