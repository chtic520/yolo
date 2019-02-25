var _ = require('underscore');
var WebStar = require('../models/webstar');
var CategoryWebStar = require('../models/categorywebstar');
var CategoryPFWebStar = require('../models/categoryPFwebstar');
var CategoryTagWebStar = require('../models/categoryTagwebstar');
var fs = require('fs');
var path = require('path');

//addStar
exports.new = function(req, res){

    CategoryWebStar
        .find({})
        .exec(function(err, category){
    CategoryPFWebStar
        .find({})
        .exec(function(err, platform){
            res.render('admin/webstarForm', {
                  title: '添加网红',
                  webstar: {},
                  category: category,
                  platform: platform
                })
        })
        })
};

exports.list = function(req, res){
    WebStar
        .find({})
        .populate('category', 'name')
        .sort('meta.createAt')
        .exec(function(err, webstar){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < webstar.length; i++){
              webstar[i].displayindex && onitems++;
            }

            res.render('admin/webstarList', {
                title: '网红推荐',
                webstar: webstar,
                onitems: onitems
            });
        })
};

exports.categoryList = function(req, res){
    CategoryWebStar
        .find({})
        .populate('webstar', 'name')
        .sort('meta.createAt')
        .exec(function(err, category){
            if (err) {
                console.log(err);
            };

            res.render('admin/webstarCategoryList', {
                title: '网红标签列表',
                category: category
            })
        })
}

exports.categoryTagList = function(req, res){
    CategoryTagWebStar
        .find({})
        .populate('tag', 'name')
        .sort('meta.createAt')
        .exec(function(err, tagCategory){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < tagCategory.length; i++){
              tagCategory[i].displayindex && onitems++;
            }

            res.render('admin/webstarTagCategoryList', {
                title: '网红标签分类列表',
                tagCategory: tagCategory,
                onitems: onitems
            })
        })
}

exports.categoryTagNew = function(req, res){

    res.render('admin/webstarTagCategoryForm', {
        title: '新增',
        tagCategory: {}
    })
}

exports.categoryTagUpdate = function(req, res){
    var id = req.params.id;

    if(id){
        CategoryTagWebStar
            .findOne({_id: id})
            .exec(function(err, tagCategory){
                res.render('admin/webstarTagCategoryForm', {
                    title: '更新 ' + tagCategory.name,
                    tagCategory: tagCategory
                })
            })
    }

}

exports.categoryTagSave = function(req, res){
    var id = req.body.tagCategory._id;
    var tagCategoryObj = req.body.tagCategory;
    var _tagCategory;

    if (id) {
        CategoryTagWebStar.findById(id, function(err, tagCategory) {
            if (err) {
                console.log(err);
            };

            _tagCategory = _.extend(tagCategory, tagCategoryObj);
            _tagCategory.save(function(err, tagCategory){

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/webstar/categorytag/list');
            });
        });
    }
    else{
        _tagCategory = new CategoryTagWebStar(tagCategoryObj);

        _tagCategory.save(function(err, tagCategory){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/webstar/categorytag/list')
        });
    }
}

exports.categoryTagDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryTagWebStar.remove({ _id: { $in: delList } }, function(err, tagCategory){
            CategoryWebStar
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].tagCategory.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].tagCategory.splice(index, 1);
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
}

exports.platform = function(req, res){
    CategoryPFWebStar
        .find({})
        .populate('webstar', 'name')
        .sort('meta.createAt')
        .exec(function(err, platform){
            if (err) {
                console.log(err);
            };

            res.render('admin/webstarPlatformList', {
                title: '网红平台列表',
                platform: platform
            })
        })
}

exports.platformNew = function(req, res){
    res.render('admin/webstarPlatformForm', {
        title: '新增直播平台',
        platform: {}
    })
}

exports.platformUpdate = function(req, res){
    var id = req.params.id;

    if (id) {
        CategoryPFWebStar
          .findOne({_id: id})
          .exec(function(err, platform){
            res.render('admin/webstarPlatformForm', {
              title: '更新直播平台 ' + platform.name,
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
        CategoryPFWebStar.findById(id, function(err, platform) {
            if (err) {
                console.log(err);
            };

            _platform = _.extend(platform, platformObj);
            _platform.save(function(err, platform){

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/webstar/platform/list');
            });
        });
    }
    else{
        _platform = new CategoryPFWebStar(platformObj);

        _platform.save(function(err, platform){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/webstar/platform/list')
        });
    }
};

exports.platformDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryPFWebStar.remove({ _id: { $in: delList } }, function(err, platform){
            WebStar
                .find({})
                .exec(function(err, webstar){
                    for (var i = 0; i < webstar.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = webstar[i].platform.indexOf(delList[j]);
                           if (index > -1) {
                                webstar[i].platform.splice(index, 1);
                                webstar[i].save()
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

exports.del = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        WebStar.remove({ _id: { $in: delList } }, function(err, webstar){
            CategoryWebStar
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].webstar.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].webstar.splice(index, 1);
                                category[i].save()
                           }
                        }
                        
                    }
                    CategoryPFWebStar
                        .find({})
                        .exec(function(err, platform){
                            for (var i = 0; i < platform.length; i++) {
                                for (var j = 0; j < delList.length; j++) {
                                   var index = platform[i].webstar.indexOf(delList[j]);
                                   if (index > -1) {
                                        platform[i].webstar.splice(index, 1);
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
        CategoryWebStar.remove({ _id: { $in: delList } }, function(err, webstar){
            WebStar
                .find({})
                .exec(function(err, webstar){
                    for (var i = 0; i < webstar.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = webstar[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                webstar[i].category.splice(index, 1);
                                webstar[i].save()
                           }
                        }
                        
                    }
            CategoryTagWebStar
                .find({})
                .exec(function(err, tagCategory){
                    for (var i = 0; i < tagCategory.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = tagCategory[i].tag.indexOf(delList[j]);
                           if (index > -1) {
                                tagCategory[i].tag.splice(index, 1);
                                tagCategory[i].save()
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
}

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
        WebStar
          .findOne({_id: id})
          .populate('category', 'name _id')
          .populate('platform', 'name _id')
          .exec(function(err, webstar){
            CategoryWebStar
              .find({})
              .exec(function(err, category){
            CategoryPFWebStar
                .find({})
                .exec(function(err, platform){
                    res.render('admin/webstarForm', {
                      itle: '更新明星 ' + webstar.name,
                      webstar: webstar,
                      category: category,
                      platform: platform
                    })
                })
              })
          })
    }
};


exports.categoryTagDisplay = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      CategoryTagWebStar.findById(id, function(err, tagCategory) {
        if (err) {
            console.log(err);
        };

        tagCategory.displayindex = on;
        tagCategory.save(function(err, tagCategory){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.display = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      WebStar.findById(id, function(err, webstar) {
        if (err) {
            console.log(err);
        };

        webstar.displayindex = on;
        webstar.save(function(err, webstar){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.webstar._id;
    var webstarObj = req.body.webstar;
    var _category = webstarObj.category;
    var _platform = webstarObj.platform;
    var _webstar;

    if (id) {
        WebStar.findById(id, function(err, webstar) {
            if (err) {
                console.log(err);
            };

            _webstar = _.extend(webstar, webstarObj);
            _webstar.save(function(err, webstar){
                CategoryWebStar
                    .find({})
                    .exec(function(err, category){
                        for (var i = 0; i < category.length; i++) {
                           var index = category[i].webstar.indexOf(id);
                           if (index > -1) {
                                category[i].webstar.splice(index, 1);
                                category[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }
                    })

                if(_category){
                if (typeof _category == 'string') {
                    CategoryWebStar
                        .findOne({_id: _category})
                        .exec(function(err, category){
                            category.webstar.push(webstar._id)

                            category.save()
                        })
                }else{
                    for (var i = 0; i < _category.length; i++) {
                        
                        CategoryWebStar
                            .findOne({_id: _category[i]})
                            .exec(function(err, category){
                                category.webstar.push(webstar._id)
                                category.save()
                            })
                    }
                }}

                CategoryPFWebStar
                    .find({})
                    .exec(function(err, platform){
                        for (var i = 0; i < platform.length; i++) {
                           var index = platform[i].webstar.indexOf(id);
                           if (index > -1) {
                                platform[i].webstar.splice(index, 1);
                                platform[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }
                    })
                CategoryPFWebStar
                    .findOne({_id: _platform})
                    .exec(function(err, platform){
                        platform.webstar.push(webstar._id)

                        platform.save()
                    })


                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/webstar/list');
            });
        });
    }
    else{
        _webstar = new WebStar(webstarObj);

        _webstar.save(function(err, webstar){
            if(_category){
            if (typeof _category == 'string') {
                CategoryWebStar
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.webstar.push(webstar._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryWebStar
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.webstar.push(webstar._id)
                            category.save()
                        })
                }
            }}

            CategoryPFWebStar
                .findOne({_id: _platform})
                .exec(function(err, platform){
                    platform.webstar.push(webstar._id)

                    platform.save()
                })
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/webstar/list')
        });
    }
};

exports.category = function(req, res){
    var id = req.body.category._id;
    var categoryObj = req.body.category;
    var _tagCategory = categoryObj.tagCategory;
    var _category;

    if (id) {
        CategoryWebStar
            .findOne({_id: id})
            .exec(function(err, category){
                if (err) {
                    console.log(err);
                };

                _category = _.extend(category, categoryObj);
                _category.save(function(err, category){
                    if (err) {
                        console.log(err)
                    }
                    CategoryTagWebStar
                        .find({})
                        .exec(function(err, tagCategory){
                            for (var i = 0; i < tagCategory.length; i++) {
                               var index = tagCategory[i].tag.indexOf(id);
                               if (index > -1) {
                                    tagCategory[i].tag.splice(index, 1);
                                    tagCategory[i].save()
                               }
                            }
                        CategoryTagWebStar
                            .findOne({_id: _tagCategory})
                            .exec(function(err, tagCategory){
                                tagCategory.tag.push(category._id)

                                tagCategory.save()

                                res.redirect('/admin/webstar/category')
                            })
                        })

                })
            })
    }else{

        _category = new CategoryWebStar(categoryObj);

        _category.save(function(err, category){
            if (err) {
                console.log(err)
            };

            res.json({
              success: 1,
              category: category
            })
        });
    }

};

exports.categoryUpdate = function(req, res){
    var id = req.params.id;

    if (id) {
        CategoryWebStar
          .findOne({_id: id})
          .populate('tagCategory', 'name _id')
          .exec(function(err, category){

            CategoryTagWebStar
              .find({})
              .exec(function(err, tagCategory){
                    res.render('admin/webstarCategoryForm', {
                      title: '更新标签 ' + category.name,
                      category: category,
                      tagCategory: tagCategory
                    })
                })
              })
    }
};
