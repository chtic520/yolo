var mongoose = require('mongoose');
var WemediaSchema = require('../schemas/wemedia');
var Wemedia = mongoose.model('Wemedia', WemediaSchema);

module.exports = Wemedia;