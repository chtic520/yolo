var mongoose = require('mongoose');
var ConnectusSchema = require('../schemas/connectus');
var Connectus = mongoose.model('Connectus', ConnectusSchema);

module.exports = Connectus;