var mongoose = require('mongoose');
var CooperationSchema = require('../schemas/cooperation');
var Cooperation = mongoose.model('Cooperation', CooperationSchema);

module.exports = Cooperation;