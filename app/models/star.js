var mongoose = require('mongoose');
var StarSchema = require('../schemas/star');
var Star = mongoose.model('Star', StarSchema);

module.exports = Star;