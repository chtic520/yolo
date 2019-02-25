var mongoose = require('mongoose');
var WebStarSchema = require('../schemas/webstar');
var WebStar = mongoose.model('WebStar', WebStarSchema);

module.exports = WebStar;