var mongoose = require('mongoose');


var recommandationDetailsSchema = mongoose.Schema({
    nameRecommandation: String,
    adresse: String,
    description: String,
    visuel: String,
    telephone:String,
    logo: String,
    mapView:String,
    urlSiteWeb:String
})

var recommandationSchema = mongoose.Schema({
    typeRecommandation: String,
    recommandationDetails: [recommandationDetailsSchema],
    hotel:{ type: mongoose.Schema.Types.ObjectId, ref: 'hotels' },
})

module.exports = mongoose.model('recommandationsDetails', recommandationSchema)