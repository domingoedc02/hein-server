const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    img:{
        type: String,
        default: null 
    },
    brand: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    branchType: {
        type: String,
        default: 'new'
    },
    onSale: {
        statusOfSale: {
            type: Boolean,
            default: false
        },
        discount: {
            type: Number,
            default: 0
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("productsModel", productsSchema);