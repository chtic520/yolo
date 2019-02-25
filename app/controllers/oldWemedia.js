var _ = require('underscore');
var Wemedia = require('../models/wemedia');
var CategoryWemedia = require('../models/categorywemedia');
var CategoryPFWemedia = require('../models/categoryPFwemedia');
var fs = require('fs');
var path = require('path');

//addStar
exports.new = function(req, res){

    CategoryWemedia
        .find({})
        .exec(function(err, category){
    CategoryPFWemedia
        .find({})
        .exec(function(err, platform){
            res.render('admin/wemediaForm', {
              title: '添加媒体',
              wemedia: {},
              category: category,
              platform: platform
            })
        })
        })
};

exports.list = function(req, res){
    Wemedia
        .find({})
        .populate('category', 'name')
        .populate('platform', 'name')
        .sort('meta.createAt')
        .exec(function(err, wemedia){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < wemedia.length; i++){
              wemedia[i].displayindex && onitems++;
            }

            res.render('admin/wemediaList', {
                title: '新微媒体',
                wemedia: wemedia,
                onitems: onitems
            });
        })
};

exports.categoryList = function(req, res){
    CategoryWemedia
        .find({})
        .populate('wemedia', 'name')
        .sort('meta.createAt')
        .exec(function(err, category){
            if (err) {
                console.log(err);
            };

            res.render('admin/wemediaCategoryList', {
                title: '媒体标签列表',
                category: category
            })
        })
}

exports.platform = function(req, res){
    CategoryPFWemedia
        .find({})
        .populate('wemedia', 'name')
        .sort('meta.createAt')
        .exec(function(err, platform){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < platform.length; i++){
              platform[i].displayindex && onitems++;
            }

            res.render('admin/wemediaPlatformList', {
                title: '媒体平台列表',
                platform: platform,
                onitems: onitems
            })
        })
}

exports.platformNew = function(req, res){
    res.render('admin/wemediaPlatformForm', {
        title: '新增媒体平台',
        platform: {}
    })
}

exports.platformUpdate = function(req, res){
    var id = req.params.id;

    if (id) {
        CategoryPFWemedia
          .findOne({_id: id})
          .exec(function(err, platform){
            res.render('admin/wemediaPlatformForm', {
              title: '更新媒体平台 ' + platform.name,
              platform: platform
            })
          })
    }
};

exports.platformSave = function(req, res){
    var id = req.body.platform._id;
    var platformObj = req.body.platform;
    var _platform;

    if (id) {
        CategoryPFWemedia.findById(id, function(err, platform) {
            if (err) {
                console.log(err);
            };

            _platform = _.extend(platform, platformObj);
            _platform.save(function(err, platform){

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/wemedia/platform/list');
            });
        });
    }
    else{
        _platform = new CategoryPFWemedia(platformObj);

        _platform.save(function(err, platform){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/wemedia/platform/list')
        });
    }
};

exports.platformDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryPFWemedia.remove({ _id: { $in: delList } }, function(err, platform){
            Wemedia
                .find({})
                .exec(function(err, wemedia){
                    for (var i = 0; i < wemedia.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = wemedia[i].platform.indexOf(delList[j]);
                           if (index > -1) {
                                wemedia[i].platform.splice(index, 1);
                                wemedia[i].save()
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

exports.platformDisplay = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      CategoryPFWemedia.findById(id, function(err, platform) {
        if (err) {
            console.log(err);
        };

        platform.displayindex = on;
        platform.save(function(err, platform){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.del = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Wemedia.remove({ _id: { $in: delList } }, function(err, wemedia){
            CategoryWemedia
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].wemedia.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].wemedia.splice(index, 1);
                                category[i].save()
                           }
                        }
                    }

                    CategoryPFWemedia
                        .find({})
                        .exec(function(err, platform){
                            for (var i = 0; i < platform.length; i++) {
                                for (var j = 0; j < delList.length; j++) {
                                   var index = platform[i].wemedia.indexOf(delList[j]);
                                   if (index > -1) {
                                        platform[i].wemedia.splice(index, 1);
                                        platform[i].save()
                                   }
                                }
                            }
                            if (err) {
                                console.log(err)
                            }else{
                                res.json({success: 1});
                            }
                        })

                })
            
        });
    }
};

exports.categoryDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryWemedia.remove({ _id: { $in: delList } }, function(err, wemedia){
            Wemedia
                .find({})
                .exec(function(err, wemedia){
                    for (var i = 0; i < wemedia.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = wemedia[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                wemedia[i].category.splice(index, 1);
                                wemedia[i].save()
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
        Wemedia
          .findOne({_id: id})
          .populate('category', 'name _id')
          .populate('platform', 'name _id')
          .exec(function(err, wemedia){
            CategoryWemedia
              .find({})
              .exec(function(err, category){
            CategoryPFWemedia
                .find({})
                .exec(function(err, platform){
                    res.render('admin/wemediaForm', {
                      title: '更新媒体 ' + wemedia.name,
                      wemedia: wemedia,
                      category: category,
                      platform: platform
                    })
                })
              })
          })
    }
};


exports.display = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Wemedia.findById(id, function(err, wemedia) {
        if (err) {
            console.log(err);
        };

        wemedia.displayindex = on;
        wemedia.save(function(err, wemedia){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.wemedia._id;
    var wemediaObj = req.body.wemedia;
    var _category = wemediaObj.category;
    var _platform = wemediaObj.platform;
    var _wemedia;

    if (id) {
        Wemedia.findById(id, function(err, wemedia) {
            if (err) {
                console.log(err);
            };

            _wemedia = _.extend(wemedia, wemediaObj);
            _wemedia.save(function(err, wemedia){
                CategoryWemedia
                    .find({})
                    .exec(function(err, category){
                        for (var i = 0; i < category.length; i++) {
                           var index = category[i].wemedia.indexOf(id);
                           if (index > -1) {
                                category[i].wemedia.splice(index, 1);
                                category[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }else{
                            res.json({success: 1});
                        }
                    })

                if (typeof _category == 'string') {
                    CategoryWemedia
                        .findOne({_id: _category})
                        .exec(function(err, category){
                            category.wemedia.push(wemedia._id)

                            category.save()
                        })
                }else{
                    for (var i = 0; i < _category.length; i++) {
                        
                        CategoryWemedia
                            .findOne({_id: _category[i]})
                            .exec(function(err, category){
                                category.wemedia.push(wemedia._id)
                                category.save()
                            })
                    }
                }

                CategoryPFWemedia
                    .find({})
                    .exec(function(err, platform){
                        for (var i = 0; i < platform.length; i++) {
                           var index = platform[i].wemedia.indexOf(id);
                           if (index > -1) {
                                platform[i].wemedia.splice(index, 1);
                                platform[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }else{
                            res.json({success: 1});
                        }
                    })
                CategoryPFWemedia
                    .findOne({_id: _platform})
                    .exec(function(err, platform){
                        platform.wemedia.push(wemedia._id)

                        platform.save()
                    })


                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/wemedia/list');
            });
        });
    }
    else{
        _wemedia = new Wemedia(wemediaObj);

        _wemedia.save(function(err, wemedia){
            if (typeof _category == 'string') {
                CategoryWemedia
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.wemedia.push(wemedia._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryWemedia
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.wemedia.push(wemedia._id)
                            category.save()
                        })
                }
            }

            CategoryPFWemedia
                .findOne({_id: _platform})
                .exec(function(err, platform){
                    platform.wemedia.push(wemedia._id)

                    platform.save()
                })
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/wemedia/list')
        });
    }
};

exports.category = function(req, res){
    var categoryObj = req.body.category;
    var _category;

    _category = new CategoryWemedia(categoryObj);

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