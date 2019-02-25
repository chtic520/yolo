var mongoose = require('mongoose');
var CategoryWechatSchema = require('../schemas/categorywechat');
var CategoryWechat = mongoose.model('CategoryWechat', CategoryWechatSchema);

module.exports = CategoryWechat;