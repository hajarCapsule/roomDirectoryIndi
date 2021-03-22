var mongoose = require('mongoose');


var imagesHotel = mongoose.Schema({
    serviceName: String,
    url: String,
})

var hotelSchema = mongoose.Schema({
    nameHotel: String,
    address: String,
    email: String,
    tel: Number,
    imageHotel: String,
    images: [imagesHotel],
})

module.exports = mongoose.model('hotelInfos', hotelSchema)