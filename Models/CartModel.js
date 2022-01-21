const mongoose = require('mongoose')

const cart = new mongoose.Schema({
    userId: {
        type: String
    },
    cartItems: {
        type: String
    }
})

module.exports = mongoose.model("cart", cart)