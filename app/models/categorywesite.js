var mongoose = require('mongoose');
var CategoryWesiteSchema = require('../schemas/categorywesite');
var CategoryWesite = mongoose.model('CategoryWesite', CategoryWesiteSchema);

module.exports = CategoryWesite;