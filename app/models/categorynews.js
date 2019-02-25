var mongoose = require('mongoose');
var CategoryNewsSchema = require('../schemas/categorynews');
var CategoryNews = mongoose.model('CategoryNews', CategoryNewsSchema);

module.exports = CategoryNews;