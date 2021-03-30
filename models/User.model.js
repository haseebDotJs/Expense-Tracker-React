const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minLength: [3, "Mininim length is 3"],
        required: [true, 'Please provide First Name']
    },
    lastName: {
        type: String,
        trim: true,
        minLength: [3, "Mininim length is 3"],
        required: [true, 'Please provide Last Name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide an email']
    },
    password: {
        type: String,
        trim: true,
        minLength: [8, "Minimim Length is 8"],
        required: [true, 'Please provide a password']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserModel)