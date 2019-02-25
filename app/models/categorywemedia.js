var mongoose = require('mongoose');
var CategoryWemediaSchema = require('../schemas/categorywemedia');
var CategoryWemedia = mongoose.model('CategoryWemedia', CategoryWemediaSchema);

module.exports = CategoryWemedia;