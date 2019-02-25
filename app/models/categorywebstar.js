var mongoose = require('mongoose');
var CategoryWebStarSchema = require('../schemas/categorywebstar');
var CategoryWebStar = mongoose.model('CategoryWebStar', CategoryWebStarSchema);

module.exports = CategoryWebStar;