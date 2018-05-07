const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   seller:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'seller'
   },
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyer'
    },
    goods:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goods'
    },
    count:Number

})


module.exports = mongoose.model('order', userSchema);
