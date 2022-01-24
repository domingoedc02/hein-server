const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    totalAmount: {
        type: Number
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    purchacedOn: {
        type: Date,
        default: Date.now
    },
    associateWith: [{
        buyer: [{
            type: String
        }]
    }]
})

module.exports = mongoose.model("orderModel", orderSchema);