var mongoose = require('mongoose');
var CategoryPFWebStarSchema = require('../schemas/categoryPFwebstar');
var CategoryPFWebStar = mongoose.model('CategoryPFWebStar', CategoryPFWebStarSchema);

module.exports = CategoryPFWebStar;