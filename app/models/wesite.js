var mongoose = require('mongoose');
var WesiteSchema = require('../schemas/wesite');
var Wesite = mongoose.model('Wesite', WesiteSchema);

module.exports = Wesite;