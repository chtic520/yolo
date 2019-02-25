var mongoose = require('mongoose');
var CategoryPFWemediaSchema = require('../schemas/categoryPFwemedia');
var CategoryPFWemedia = mongoose.model('CategoryPFWemedia', CategoryPFWemediaSchema);

module.exports = CategoryPFWemedia;