const mongoose = require('mongoose')

const image = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    profileImg: {
        type: String
    }
}
, {
    collection: 'users'
})

module.exports = mongoose.model("sampleImage", image)