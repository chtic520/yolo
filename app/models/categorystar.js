var mongoose = require('mongoose');
var CategoryStarSchema = require('../schemas/categorystar');
var CategoryStar = mongoose.model('CategoryStar', CategoryStarSchema);

module.exports = CategoryStar;