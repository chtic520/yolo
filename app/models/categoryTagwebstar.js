var mongoose = require('mongoose');
var CategoryTagWebStarSchema = require('../schemas/categoryTagwebstar');
var CategoryTagWebStar = mongoose.model('CategoryTagWebStar', CategoryTagWebStarSchema);

module.exports = CategoryTagWebStar;