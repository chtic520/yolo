var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var WebStarSchema = new Schema({
	name: String,
	funs: Number,
	averplay: String,
	pic: String,
	summary: String,
	platform: [{
		type: ObjectId,
		ref: 'CategoryPFWebStar'
	}],
	displayindex: {
		type: Boolean,
		default: false
	},
	category: [{
		type: ObjectId,
		ref: 'CategoryWebStar'
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

WebStarSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}

	next();
});

WebStarSchema.statics = {
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findById: function(id, cb){
		return this
			.findOne({_id: id})
			.exec(cb);
	}
}

module.exports = WebStarSchema