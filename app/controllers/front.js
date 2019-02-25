var Cases = require('../models/cases');
var CategoryCases = require('../models/categorycases');
var Star = require('../models/star');
var CategoryStar = require('../models/categorystar');
var Webstar = require('../models/webstar');
var CategoryWebStar = require('../models/categorywebstar');
var CategoryPFWebStar = require('../models/categoryPFwebstar');
var CategoryTagWebStar = require('../models/categoryTagwebstar');
var Wechat = require('../models/wechat');
var CategoryWechat = require('../models/categorywechat');
var Webo = require('../models/webo');
var CategoryWebo = require('../models/categorywebo');
var Wesite = require('../models/wesite');
var CategoryWesite = require('../models/categorywesite');
var Stage = require('../models/stage');
var CategoryStage = require('../models/categorystage');
var News = require('../models/news');
var CategoryNews = require('../models/categorynews');
var Banner = require('../models/banner');
var Cooperation = require('../models/cooperation');
var Connectus = require('../models/connectus');
var fs = require('fs');
var path = require('path');

exports.cases = function(req, res){
	var page = parseInt(req.query.page, 10) || 0;
	var count = 12;
	var index = page * count;

	Cases
		.find({})
		.exec(function(err, cases){
	CategoryCases
		.find({})
		.exec(function(err, category){
	Cooperation
		.find({})
		.exec(function(err, cooperation){
	        if (err) {
	            console.log(err);
	        };
	        var results = cases.slice(index, index + count);
			res.render('front/cases', {
				title: '案例展示',
				keyword: 1,
				currentPage: page,
				totalPage: Math.ceil(cases.length / count),
				cases: results,
				cooperation: cooperation,
				category: category,
				type: 'cases'
			})
		})
		})
		})
}

exports.caseSearch = function(req, res){
	var cateId = req.query.category;
	var page = parseInt(req.query.page, 10);
	var count = 12;
	var index = page * count;

	CategoryCases
		.find({})
		.populate({
			path: 'cases',
			select: 'title displaytimes platform scene form pic summary'
		})
		.exec(function(err, category){
			
			if (err) {
				console.log(err)
			}

			var _thisCat;
			for (var i = 0; i < category.length; i++) {
				if(category[i]._id == cateId){
					_thisCat = category[i];
					break;
				}
			}
			var cases = _thisCat.cases || [];
			var results = cases.slice(index, index + count);
			Cooperation
				.find({})
				.exec(function(err, cooperation){
					if (err) {
						console.log(err);
					}

					res.render('front/cases', {
						title: '案例展示',
						keyword: _thisCat,
						currentPage: page,
						totalPage: Math.ceil(cases.length / count),
						cases: results,
						cooperation: cooperation,
						category: category,
						type: 'cases'
					})
					
				})


		})
}

exports.star = function(req, res){
	var page = parseInt(req.query.page, 10) || 0;
	var count = 12;
	var index = page * count;

	Star
		.find({})
		.exec(function(err, stars){
	CategoryStar
		.find({})
		.exec(function(err, category){
	        if (err) {
	            console.log(err);
	        };
	        var results = stars.slice(index, index + count);
			res.render('front/star', {
				title: '明星资源',
				keyword: 1,
				currentPage: page,
				totalPage: Math.ceil(stars.length / count),
				stars: results,
				category: category,
				type: 'star'
			})
		})
		})
}

exports.starSearch = function(req, res){
	var cateId = req.query.category;
	var page = parseInt(req.query.page, 10);
	var count = 12;
	var index = page * count;

	CategoryStar
		.find({})
		.populate({
			path: 'star',
			select: 'name pic platform works summary'
		})
		.exec(function(err, category){
			
			if (err) {
				console.log(err)
			}

			var _thisCat;
			for (var i = 0; i < category.length; i++) {
				if(category[i]._id == cateId){
					_thisCat = category[i];
					break;
				}
			}

			var star = _thisCat.star || [];
			var results = star.slice(index, index + count);

			res.render('front/star', {
				title: '明星资源',
				keyword: _thisCat,
				currentPage: page,
				totalPage: Math.ceil(star.length / count),
				stars: results,
				category: category,
				type: 'star'
			})


		})
}

exports.webstar = function(req, res){
	var page = parseInt(req.query.page, 10) || 0;
	var count = 12;
	var index = page * count;

	Webstar
		.find({})
		.exec(function(err, webstars){
	CategoryPFWebStar
		.find({})
		.exec(function(err, platform){
	CategoryTagWebStar
		.find({})
		.populate('tag', 'name _id')
		.exec(function(err, tagCategory){
	        if (err) {
	            console.log(err);
	        };
	        var results = webstars.slice(index, index + count);
			res.render('front/webstar', {
				title: '网红资源',
				currentPage: page,
				totalPage: Math.ceil(webstars.length / count),
				webstars: results,
				platform: platform,
				tagCategory: tagCategory,
				tagVal: '',
				platformVal: '',
				fanMax: '',
				fanMin: '',
				type: 'webstar'
			})
		})
		})
		})
}

exports.webstarSearch = function(req, res){
	var _tag = req.query.tag;
	var _platform = req.query.platform || 0;
	var _fanMax = parseInt(req.query.fanMax, 10);
	var _fanMin = parseInt(req.query.fanMin, 10);
	var page = parseInt(req.query.page, 10);
	var count = 12;
	var index = page * count;
	var total;

	var fiters = {};

	(_tag != "") && (fiters.category = _tag);
	(_platform != "") && (fiters.platform = _platform);
	(req.query.fanMax != "") && (fiters.funs = {$lte: _fanMax * 10000});

	if(req.query.fanMax != "" && req.query.fanMin != ""){
		fiters.funs.$gt = _fanMin * 10000;
	}else if(req.query.fanMax == "" && req.query.fanMin != ""){
		fiters.funs = {$gt: _fanMin * 10000};
	};

	function getCount(){
		var promise = new Promise(function(resolve, reject){
			function handle(err, cou){
                if(err){
                    reject(err);
                }else{
                    resolve(cou)
                }
            }

            Webstar.find({}).exec(handle)
		})

		return promise;
	}


	Webstar
		.find(fiters)
		.sort({'meta.updateAt': -1})
		.limit(count).skip(index)
		.exec(function(err, webstars){
			if(err){
				console.log(err);
			}
	CategoryPFWebStar
		.find({})
		.exec(function(err, platform){

	CategoryTagWebStar
		.find({})
		.populate('tag', 'name _id')
		.exec(function(err, tagCategory){

			getCount().then(function(star){
				total  = star.length

				res.render('front/webstar', {
					title: '网红资源',
					currentPage: page,
					totalPage: Math.ceil(total / count),
					webstars: webstars,
					platform: platform,
					tagCategory: tagCategory,
					tagVal: _tag || '',
					platformVal: _platform || '',
					fanMax: _fanMax || '',
					fanMin: _fanMin || '',
					type: 'webstar'
				})
				
			})

		})
		})
		})
}

exports.wechat = function(req, res){
	var page = parseInt(req.query.page, 10) || 0;
	var count = 10;
	var index = page * count;

	Wechat
		.find({})
		.exec(function(err, wechat){
	CategoryWechat
		.find({})
		.exec(function(err, category){
	        if (err) {
	            console.log(err);
	        };

	        var results = wechat.slice(index, index + count);

			res.render('front/wechat', {
				title: '新微媒体－微信资源',
				keyword: 1,
				currentPage: page,
				totalPage: Math.ceil(wechat.length / count),
				wechat: results,
				category: category,
				type: 'wemedia',
				platform: 'wechat'
			})
		})
		})
}

exports.wechatSearch = function(req, res){
	var cateId = req.query.category;
	var page = parseInt(req.query.page, 10);
	var count = 10;
	var index = page * count;

	CategoryWechat
		.find({})
		.populate({
			path: 'wechat',
			select: 'name pic funs firstRead secondRead summary'
		})
		.exec(function(err, category){
			
			if (err) {
				console.log(err)
			}

			var _thisCat;
			for (var i = 0; i < category.length; i++) {
				if(category[i]._id == cateId){
					_thisCat = category[i];
					break;
				}
			}

			var wechat = _thisCat.wechat || [];
			var results = wechat.slice(index, index + count);

			res.render('front/wechat', {
				title: '新微媒体－微信资源',
				keyword: _thisCat,
				currentPage: page,
				totalPage: Math.ceil(wechat.length / count),
				wechat: results,
				category: category,
				type: 'wemedia',
				platform: 'wechat'
			})


		})
}

exports.webo = function(req, res){
	var page = parseInt(req.query.page, 10) || 0;
	var count = 10;
	var index = page * count;

	Webo
		.find({})
		.exec(function(err, webo){
	CategoryWebo
		.find({})
		.exec(function(err, category){
	        if (err) {
	            console.log(err);
	        };

	        var results = webo.slice(index, index + count);

			res.render('front/webo', {
				title: '新微媒体－微博资源',
				keyword: 1,
				currentPage: page,
				totalPage: Math.ceil(webo.length / count),
				webo: results,
				category: category,
				type: 'wemedia',
				platform: 'webo'
			})
		})
		})
}

exports.weboSearch = function(req, res){
	var cateId = req.query.category;
	var page = parseInt(req.query.page, 10);
	var count = 10;
	var index = page * count;

	CategoryWebo
		.find({})
		.populate({
			path: 'webo',
			select: 'name pic funs firstRead secondRead summary'
		})
		.exec(function(err, category){
			
			if (err) {
				console.log(err)
			}

			var _thisCat;
			for (var i = 0; i < category.length; i++) {
				if(category[i]._id == cateId){
					_thisCat = category[i];
					break;
				}
			}

			var webo = _thisCat.webo || [];
			var results = webo.slice(index, index + count);

			res.render('front/webo', {
				title: '新微媒体－微博资源',
				keyword: _thisCat,
				currentPage: page,
				totalPage: Math.ceil(webo.length / count),
				webo: results,
				category: category,
				type: 'wemedia',
				platform: 'webo'
			})


		})
}

exports.wesite = function(req, res){
	var page = parseInt(req.query.page, 10) || 0;
	var count = 9;
	var index = page * count;

	Wesite
		.find({})
		.exec(function(err, wesite){
	CategoryWesite
		.find({})
		.exec(function(err, category){
	        if (err) {
	            console.log(err);
	        };

	        var results = wesite.slice(index, index + count);

			res.render('front/wesite', {
				title: '新微媒体－微博资源',
				keyword: 1,
				currentPage: page,
				totalPage: Math.ceil(wesite.length / count),
				wesite: results,
				category: category,
				type: 'wemedia',
				platform: 'wesite'
			})
		})
		})
}

exports.wesiteSearch = function(req, res){
	var cateId = req.query.category;
	var page = parseInt(req.query.page, 10);
	var count = 9;
	var index = page * count;

	CategoryWesite
		.find({})
		.populate({
			path: 'wesite',
			select: 'name pic funs firstRead secondRead summary'
		})
		.exec(function(err, category){
			
			if (err) {
				console.log(err)
			}

			var _thisCat;
			for (var i = 0; i < category.length; i++) {
				if(category[i]._id == cateId){
					_thisCat = category[i];
					break;
				}
			}

			var wesite = _thisCat.wesite || [];
			var results = wesite.slice(index, index + count);

			res.render('front/wesite', {
				title: '新微媒体－微博资源',
				keyword: _thisCat,
				currentPage: page,
				totalPage: Math.ceil(wesite.length / count),
				wesite: results,
				category: category,
				type: 'wemedia',
				platform: 'wesite'
			})


		})
}

exports.stage = function(req, res){
	var page = parseInt(req.query.page, 10) || 0;
	var count = 9;
	var index = page * count;

	Stage
		.find({})
		.exec(function(err, stages){
	CategoryStage
		.find({})
		.exec(function(err, category){
	        if (err) {
	            console.log(err);
	        };

	        var results = stages.slice(index, index + count);

			res.render('front/stage', {
				title: '舞美设备',
				keyword: 1,
				currentPage: page,
				totalPage: Math.ceil(stages.length / count),
				stages: results,
				category: category,
				type: 'stage'
			})
		})
		})
}

exports.stageSearch = function(req, res){
	var cateId = req.query.category;
	var page = parseInt(req.query.page, 10);
	var count = 9;
	var index = page * count;

	CategoryStage
		.find({})
		.populate({
			path: 'stage',
			select: 'name price pic category'
		})
		.exec(function(err, category){
			
			if (err) {
				console.log(err)
			}

			var _thisCat;
			for (var i = 0; i < category.length; i++) {
				if(category[i]._id == cateId){
					_thisCat = category[i];
					break;
				}
			}

			var stage = _thisCat.stage || [];
			var results = stage.slice(index, index + count);

			res.render('front/stage', {
				title: '舞美设备',
				keyword: _thisCat,
				currentPage: page,
				totalPage: Math.ceil(stage.length / count),
				stages: results,
				category: category,
				type: 'stage'
			})


		})
}

exports.news = function(req, res){
	var page = parseInt(req.query.page, 10) || 0;
	var count = 5;
	var index = page * count;

	News
		.find({})
		.exec(function(err, news){
	CategoryNews
		.find({})
		.exec(function(err, category){
	        if (err) {
	            console.log(err);
	        };

	        var results = news.slice(index, index + count);
			res.render('front/news', {
				title: '最新资讯',
				keyword: 1,
				currentPage: page,
				totalPage: Math.ceil(news.length / count),
				news: results,
				category: category,
				type: 'news'
			})
		})
		})
}

exports.newsSearch = function(req, res){
	var cateId = req.query.category;
	var page = parseInt(req.query.page, 10);
	var count = 5;
	var index = page * count;

	CategoryNews
		.find({})
		.populate({
			path: 'news',
			select: '_id title subtitle author content pic meta'
		})
		.exec(function(err, category){
			
			if (err) {
				console.log(err)
			}

			var _thisCat;
			for (var i = 0; i < category.length; i++) {
				if(category[i]._id == cateId){
					_thisCat = category[i];
					break;
				}
			}

			var news = _thisCat.news || [];
			var results = news.slice(index, index + count);

			res.render('front/news', {
				title: '最新资讯',
				keyword: _thisCat,
				currentPage: page,
				totalPage: Math.ceil(news.length / count),
				news: results,
				category: category,
				type: 'news'
			})


		})
}

exports.newsDetail = function(req, res){
    var id = req.params.id;
    var thisNews = [];

    if (id) {
        News
          .find({})
          .populate('category', 'name _id')
          .exec(function(err, news){

          	for (var i = 0; i < news.length; i++) {
          		if (news[i]._id == id) {
          			thisNews = news[i];
          		}
          	}

            res.render('front/newsDetail', {
              title: thisNews.title,
              news: thisNews,
              allNews : news,
              type: 'news'
            })
          })
    }
};

exports.connectus = function(req, res){
	var _connectus = {}
	Connectus
		.find({})
		.exec(function(err, connectus){
			if (connectus.length > 0) {
                _connectus = connectus[0]
            }
			res.render('front/connectus', {
	          title: '联系我们',
	          connectus: _connectus,
	          type: 'connectus'
	        })
		})
};