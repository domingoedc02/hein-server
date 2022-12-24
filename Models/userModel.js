const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: [true, 'First Name is required']
    },
    lastName:{
        type: String,
        required: [true, 'Last Name is required']
    },
    userName:{
        type: String,
        required: [true, 'Username is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [false, 'Password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model("userModel", userSchema);