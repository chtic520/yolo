var mongoose = require('mongoose');
var CategoryWeboSchema = require('../schemas/categorywebo');
var CategoryWebo = mongoose.model('CategoryWebo', CategoryWeboSchema);

module.exports = CategoryWebo;