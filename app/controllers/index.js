// var Reative = require('../models/reative');
var Cases = require('../models/cases');
var Star = require('../models/star');
var Webstar = require('../models/webstar');
// var Wemedia = require('../models/wemedia');
var CategoryStage = require('../models/categorystage');
var CategoryWechat = require('../models/categorywechat');
var CategoryWebo = require('../models/categorywebo');
var CategoryWesite = require('../models/categorywesite');
var News = require('../models/news');
var Banner = require('../models/banner');
var Cooperation = require('../models/cooperation');
var CategoryPFwemedia = require('../models/categoryPFwemedia');
// var Conectus = require('../models/conectus');
var fs = require('fs');
var path = require('path');

exports.index = function(req, res){
	var result = {
		title: '首页-有乐',
		type: 'index'
	}

	Cases
		.find({})
		.exec(function(err, cases){
	        if (err) {
	            console.log(err);
	        };

	        result.cases = cases;

    Star
		.find({})
		.exec(function(err, stars){
	        if (err) {
	            console.log(err);
	        };

	        result.stars = stars;

    Webstar
		.find({})
		.exec(function(err, webstars){
	        if (err) {
	            console.log(err);
	        };

	        result.webstars = webstars;

	News
		.find({})
		.exec(function(err, news){
	        if (err) {
	            console.log(err);
	        };

	        result.news = news;
	Banner
		.find({})
		.exec(function(err, banner){
	        if (err) {
	            console.log(err);
	        };

	        var _banner = [];

	        for (var i = 0; i < banner.length; i++) {
	        	if(banner[i].displayindex){
	        		_banner.push(banner[i]);
	        	}
	        }

	        result.banner = _banner;
	Cooperation
		.find({})
		.exec(function(err, cooperation){
	        if (err) {
	            console.log(err);
	        };

	        result.cooperation = cooperation;
    CategoryStage
        .find({})
        .exec(function(err, categorystage){
            if (err) {
                console.log(err);
            };

            result.categorystage = categorystage;
    CategoryWechat
        .find({})
        .exec(function(err, wechatTag){
            if (err) {
                console.log(err);
            };

            result.wechatTag = wechatTag;
    CategoryWebo
        .find({})
        .exec(function(err, weboTag){
            if (err) {
                console.log(err);
            };

            result.weboTag = weboTag;
    CategoryWesite
        .find({})
        .exec(function(err, wesiteTag){
            if (err) {
                console.log(err);
            };

            result.wesiteTag = wesiteTag;
    CategoryPFwemedia
        .find({})
        .exec(function(err, platform){
            if (err) {
                console.log(err);
            };

            result.platforms = platform;

            res.render('front/index', result);
        })
        })
        })
        })
        })
	    })
	    })
	    })
	    })
	    })
	    })
};

exports.upload = function(req, res){
    var file = req.files.file

    fs.readFile(file.path, function (err, data) {
      if (err) {
          console.log(err);
      }
      var timestamp = Date.now();
      var type = file.type.split('/')[1];
      var poster = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../', '/public/images/upload/' + poster);

      fs.writeFile(newPath, data, function (err) {
        if (err) {
            console.log(err);
        }

        res.json({
            success: 1,
            path: '/images/upload/' + poster
        });
      })
    })
};

exports.bannerNew = function(req, res){
    res.render('admin/bannerForm', {
          title: '新增banner图',
          banner: {}
        })
};

exports.bannerSave = function(req, res){
	var id = req.body.banner._id;
    var bannerObj = req.body.banner;
    var _banner

    if (id) {
        Banner.findById(id, function(err, banner) {
            if (err) {
                console.log(err);
            };

            _banner = _.extend(banner, bannerObj);
            _banner.save(function(err, banner){


                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/index');
            });
        });
    }
    else{
        _banner = new Banner(bannerObj);

        _banner.save(function(err, banner){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/index')
        });
    }
}

exports.bannerUpdate = function(req, res){
	var id = req.params.id;

    if (id) {
        Banner
          .findOne({_id: id})
          .exec(function(err, banner){
            res.render('admin/bannerForm', {
              title: '更新banner图 ' + banner.title,
              banner: banner
            })
          })
    }
}

exports.bannerDisplay = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Banner.findById(id, function(err, banner) {
        if (err) {
            console.log(err);
        };

        banner.displayindex = on;
        banner.save(function(err, banner){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.bannerDel = function(req, res){
	var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Banner.remove({ _id: { $in: delList } }, function(err, banner){
        	if (err) {
                console.log(err)
            }else{
                res.json({success: 1});
            }            
        });
    }
}

exports.cooperationNew = function(req, res){
    res.render('admin/cooperationForm', {
          title: '新增合作客户',
          cooperation: {}
        })
};

exports.cooperationSave = function(req, res){
	var id = req.body.cooperation._id;
    var cooperationObj = req.body.cooperation;
    var _cooperation

    if (id) {
        Cooperation.findById(id, function(err, cooperation) {
            if (err) {
                console.log(err);
            };

            _cooperation = _.extend(cooperation, cooperationObj);
            _cooperation.save(function(err, cooperation){


                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/index');
            });
        });
    }
    else{
        _cooperation = new Cooperation(cooperationObj);

        _cooperation.save(function(err, cooperation){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/index')
        });
    }

}

exports.cooperationUpdate = function(req, res){
	var id = req.params.id;

    if (id) {
        Cooperation
          .findOne({_id: id})
          .exec(function(err, cooperation){
            res.render('admin/cooperationForm', {
              title: '更新合作客户 ' + cooperation.title,
              cooperation: cooperation
            })
          })
    }
}

exports.cooperationDisplay = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Cooperation.findById(id, function(err, cooperation) {
        if (err) {
            console.log(err);
        };

        cooperation.displayindex = on;
        cooperation.save(function(err, cooperation){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.cooperationDel = function(req, res){
	var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Cooperation.remove({ _id: { $in: delList } }, function(err, cooperation){
        	if (err) {
                console.log(err)
            }else{
                res.json({success: 1});
            }            
        });
    }
}

exports.admin = function(req, res){

	res.render('admin/iframe', {
        title: '后台-有乐'
    });
};

exports.adminIndex = function(req, res){

	Banner
		.find({})
		.exec(function(err, banners){
	        if (err) {
	            console.log(err);
	        };

	        var onitemsb = 0;

            for(var i = 0; i < banners.length; i++){
              banners[i].displayindex && onitemsb++;
            }
	Cooperation
		.find({})
		.exec(function(err, cooperations){
	        if (err) {
	            console.log(err);
	        };

	        var onitemsc = 0;

            for(var i = 0; i < cooperations.length; i++){
              cooperations[i].displayindex && onitemsc++;
            }

	        res.render('admin/index', {
		        title: '后台-有乐',
		        banners: banners,
		        cooperations: cooperations,
		        onitemsb: onitemsb,
		        onitemsc: onitemsc
		    });
	    })
	    })
	
};
