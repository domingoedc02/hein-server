const mongoose = require('mongoose')

const cart = new mongoose.Schema({
    userId: {
        type: String
    },
    cartItems: {
        type: String
    },
    quantity: {
        type: Number
    },
    subtotal: {
        type: Number
    }
})

module.exports = mongoose.model("cart", cart)