var _ = require('underscore');
var News = require('../models/news');
var CategoryNews = require('../models/categorynews');
var fs = require('fs');
var path = require('path');

//addStar
exports.new = function(req, res){

    CategoryNews
        .find({})
        .exec(function(err, category){
        res.render('admin/newsForm', {
              title: '添加资讯',
              news: {},
              category: category
            })
        })
};

exports.list = function(req, res){
    News
        .find({})
        .populate('category', 'name')
        .sort('meta.createAt')
        .exec(function(err, news){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < news.length; i++){
              news[i].displayindex && onitems++;
            }

            res.render('admin/newsList', {
                title: '最新资讯',
                news: news,
                onitems: onitems
            });
        })
};

exports.categoryList = function(req, res){
    CategoryNews
        .find({})
        .populate('news', 'name')
        .sort('meta.createAt')
        .exec(function(err, category){
            if (err) {
                console.log(err);
            };

            res.render('admin/newsCategoryList', {
                title: '资讯标签列表',
                category: category
            })
        })
}

exports.del = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        News.remove({ _id: { $in: delList } }, function(err, news){
            CategoryNews
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].news.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].news.splice(index, 1);
                                category[i].save()
                           }
                        }
                        
                    }
                    if (err) {
                        console.log(err)
                    }else{
                        res.json({success: 1});
                    }
                })
            
        });
    }
};

exports.categoryDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryNews.remove({ _id: { $in: delList } }, function(err, news){
            News
                .find({})
                .exec(function(err, news){
                    for (var i = 0; i < news.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = news[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                news[i].category.splice(index, 1);
                                news[i].save()
                           }
                        }
                        
                    }
                    if (err) {
                        console.log(err)
                    }else{
                        res.json({success: 1});
                    }
                })
            
        });
    }
}

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
        News
          .findOne({_id: id})
          .populate('category', 'name _id')
          .exec(function(err, news){
            CategoryNews
              .find({})
              .exec(function(err, category){
                res.render('admin/newsForm', {
                  title: '更新资讯 ' + news.name,
                  news: news,
                  category: category
                })
              })
          })
    }
};


exports.display = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      News.findById(id, function(err, news) {
        if (err) {
            console.log(err);
        };

        news.displayindex = on;
        news.save(function(err, news){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.news._id;
    var newsObj = req.body.news;
    var _category = newsObj.category;
    var _news;

    if (id) {
        News.findById(id, function(err, news) {
            if (err) {
                console.log(err);
            };

            _news = _.extend(news, newsObj);
            _news.save(function(err, news){
                CategoryNews
                    .find({})
                    .exec(function(err, category){
                        for (var i = 0; i < category.length; i++) {
                           var index = category[i].news.indexOf(id);
                           if (index > -1) {
                                category[i].news.splice(index, 1);
                                category[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }
                    })
                if(_category){
                if (typeof _category == 'string') {
                    CategoryNews
                        .findOne({_id: _category})
                        .exec(function(err, category){
                            category.news.push(news._id)

                            category.save()
                        })
                }else{
                    for (var i = 0; i < _category.length; i++) {
                        
                        CategoryNews
                            .findOne({_id: _category[i]})
                            .exec(function(err, category){
                                category.news.push(news._id)
                                category.save()
                            })
                    }
                }}


                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/news/list');
            });
        });
    }
    else{
        _news = new News(newsObj);

        _news.save(function(err, news){
            if(_category){
            if (typeof _category == 'string') {
                CategoryNews
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.news.push(news._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryNews
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.news.push(news._id)
                            category.save()
                        })
                }
            }}
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/news/list')
        });
    }
};

exports.category = function(req, res){
    var categoryObj = req.body.category;
    var _category;

    _category = new CategoryNews(categoryObj);

    _category.save(function(err, category){
        if (err) {
            console.log(err)
        };

        res.json({
          success: 1,
          category: category
        })
    });
};
