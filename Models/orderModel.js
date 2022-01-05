const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    totalAmount: {
        type: Number,
        required: true
    },
    purchacedOn: {
        type: Date,
        default: Date.now
    },
    associateWith: [{
        owner: [{
            type: String,
            required: true
        }]
    }]
})

module.exports = mongoose.model("orderModel", orderSchema);