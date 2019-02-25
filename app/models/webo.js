var mongoose = require('mongoose');
var WeboSchema = require('../schemas/webo');
var Webo = mongoose.model('Webo', WeboSchema);

module.exports = Webo;