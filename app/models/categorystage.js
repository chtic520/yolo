var mongoose = require('mongoose');
var CategoryStageSchema = require('../schemas/categorystage');
var CategoryStage = mongoose.model('CategoryStage', CategoryStageSchema);

module.exports = CategoryStage;