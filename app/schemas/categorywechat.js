var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategoryWechatSchema = new Schema({
	name: String,
	wechat:[{
		type: ObjectId,
		ref: 'Wechat'
	}],
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

CategoryWechatSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}

	next();
});

CategoryWechatSchema.statics = {
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.createAt')
			.exec(cb);
	},
	findById: function(id, cb){
		return this
			.findOne({_id: id})
			.exec(cb);
	}
}

module.exports = CategoryWechatSchema