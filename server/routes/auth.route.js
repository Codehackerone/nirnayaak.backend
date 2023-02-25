const express = require('express');
const route = new express.Router()


const {postLogin} = require('../controllers/auth.controller')
const {postRegister} = require('../controllers/auth.controller')

const auth = require('../middleware/auth');
const User = require('../models/user.model');

route.post('/register', postRegister)
route.post('/login', postLogin)
route.post('/delete', (req, res) => {
    User.findOneAndDelete({email: req.body.email})
    .then((user) => {
        if(!user) {
            return res.status(404).send('error')
        }
        res.status(200).send('deleted')
    })
})

module.exports = route