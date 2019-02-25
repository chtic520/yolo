var mongoose = require('mongoose');
var StageSchema = require('../schemas/stage');
var Stage = mongoose.model('Stage', StageSchema);

module.exports = Stage;