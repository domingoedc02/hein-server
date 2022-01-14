const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // img:{
    //     data: Buffer,
    //     contentType: String,
    // },
    // category: {
    //     type: String,
    //     required: true
    // },
    // branchType: {
    //     type: Boolean,
    //     default: true
    // },
    // // onSale: {
    // //     statusOfSale: {
    // //         type: Boolean,
    // //         default: false
    // //     },
    // //     discount: {
    // //         type: Number,
    // //         default: 0
    // //     }
    // // },
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