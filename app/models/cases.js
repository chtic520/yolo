var mongoose = require('mongoose');
var CasesSchema = require('../schemas/cases');
var Cases = mongoose.model('Cases', CasesSchema);

module.exports = Cases;