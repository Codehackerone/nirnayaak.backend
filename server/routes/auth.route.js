const express = require('express');
const route = new express.Router()

const {getLoginPage} = require('../controllers/auth.controller')
const {postLogin} = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

route.get('/login', getLoginPage)
route.post('/login', postLogin)


module.exports = route