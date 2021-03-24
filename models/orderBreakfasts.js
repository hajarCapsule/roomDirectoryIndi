var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
    details: [Object]
})

var orderBreakfastSchema = mongoose.Schema({
    total :Number,
    quantity: Number,
    lieu : String ,
    userID :{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    foodID:{type: mongoose.Schema.Types.ObjectId, ref: 'foods'},
    order: [orderSchema]
})

module.exports = mongoose.model('orderBreakfasts', orderBreakfastSchema)


