const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    licenseID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    file: {
        data: Buffer,
        contentType: String
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User