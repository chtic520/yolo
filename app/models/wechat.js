var mongoose = require('mongoose');
var WechatSchema = require('../schemas/wechat');
var Wechat = mongoose.model('Wechat', WechatSchema);

module.exports = Wechat;