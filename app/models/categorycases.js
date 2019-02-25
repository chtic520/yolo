var mongoose = require('mongoose');
var CategoryCasesSchema = require('../schemas/categorycases');
var CategoryCases = mongoose.model('CategoryCases', CategoryCasesSchema);

module.exports = CategoryCases;