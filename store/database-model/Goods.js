const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    introduce: String,
    price: Number,
    breviaryPath: Array,
    detailsPath: Array,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller'
    }
})

module.exports = mongoose.model('goods', schema);