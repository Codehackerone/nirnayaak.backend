const User = require('../models/user.model')
const fs = require('fs')
const path = require('path')

const postLogin = (req, res) => {
    let mobile = req.body.mobile
    let password = req.body.password

    User.findOne({ mobile, password })
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
    let mobile = req.body.mobile
    let designation = req.body.designation

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);


    
    // var img = fs.readFileSync(req.file.path);
    // var encode_img = img.toString('base64');
    // var final_img = {
    //     contentType:req.file.mimetype,
    //     image:new Buffer(encode_img,'base64')
    // };

    let user = new User({
        licenseID,
        name,
        mobile,
        password,
        designation,
        // file: final_img
    })

    user.save()
        .then((user) => {
            if(!user) {
                return res.status(404).send('error')
            }
    client.messages
      .create({
         body: "Congratulations! You've been verified",
         from: `+${process.env.TWILIO_PHONE_NUMBER}`,
         statusCallback: 'http://postb.in/1234abcd',
         to: `+91${mobile}`
       })
      .then(message => console.log(message.sid));
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