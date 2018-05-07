
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    user:String,
    pwd:String,
    logoPath:String,
    bannerPath:String

})

module.exports = mongoose.model('sellers', sellerSchema);