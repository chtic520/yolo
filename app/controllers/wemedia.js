var _ = require('underscore');
var Wechat = require('../models/wechat');
var CategoryWechat = require('../models/categorywechat');
var Webo = require('../models/webo');
var CategoryWebo = require('../models/categorywebo');
var Wesite = require('../models/wesite');
var CategoryWesite = require('../models/categorywesite');
var fs = require('fs');
var path = require('path');

//addStar
exports.index = function(req, res){
    Wesite
        .find({})
        .exec(function(err, wesite){
    CategoryWesite
        .find({})
        .exec(function(err, catwesite){
    Webo
        .find({})
        .exec(function(err, webo){ 
    CategoryWebo
        .find({})
        .exec(function(err, catwebo){
    Wechat
        .find({})
        .exec(function(err, wechat){
    CategoryWechat
        .find({})
        .exec(function(err, catwechat){
            res.render('admin/wemediaIndex', {
              title: '新微媒体',
              wechat: wechat,
              catwechat: catwechat,
              webo: webo,
              catwebo: catwebo,
              wesite: wesite,
              catwesite: catwesite
            })
        })
        })
        })
        })
        })
        })
};

exports.wechatList = function(req, res){
    Wechat
        .find({})
        .populate('category', 'name')
        .exec(function(err, wechat){
            res.render('admin/wechatList', {
                title: '微信资源',
                wechat: wechat
            })
        })
}


exports.weboList = function(req, res){
    Webo
        .find({})
        .populate('category', 'name')
        .exec(function(err, webo){
            res.render('admin/weboList', {
                title: '微博资源',
                webo: webo
            })
        })
}


exports.wesiteList = function(req, res){
    Wesite
        .find({})
        .populate('category', 'name')
        .exec(function(err, wesite){
            res.render('admin/wesiteList', {
                title: '网站媒体',
                wesite: wesite
            })
        })
}

exports.wechatNew = function(req, res){
    CategoryWechat
        .find({})
        .exec(function(err, category){
            res.render('admin/wechatForm', {
                title: '新增',
                wechat: {},
                category: category
            })
        })
}


exports.weboNew = function(req, res){
    CategoryWebo
        .find({})
        .exec(function(err, category){
            res.render('admin/weboForm', {
                title: '新增',
                webo: {},
                category: category
            })
        })
}


exports.wesiteNew = function(req, res){
    CategoryWesite
        .find({})
        .exec(function(err, category){
            res.render('admin/wesiteForm', {
                title: '新增',
                wesite: {},
                category: category
            })
        })
}

exports.wechatUpdate = function(req, res){
    var id = req.params.id;

    if (id) {
        Wechat
          .findOne({_id: id})
          .populate('category', 'name _id')
          .exec(function(err, wechat){
            CategoryWechat
              .find({})
              .exec(function(err, category){
                res.render('admin/wechatForm', {
                  title: '更新微信 ' + wechat.name,
                  wechat: wechat,
                  category: category
                })
              })
          })
    }
}


exports.weboUpdate = function(req, res){
    var id = req.params.id;

    if (id) {
        Webo
          .findOne({_id: id})
          .populate('category', 'name _id')
          .exec(function(err, webo){
            CategoryWebo
              .find({})
              .exec(function(err, category){
                res.render('admin/weboForm', {
                  title: '更新微信 ' + webo.name,
                  webo: webo,
                  category: category
                })
              })
          })
    }
}


exports.wesiteUpdate = function(req, res){
    var id = req.params.id;

    if (id) {
        Wesite
          .findOne({_id: id})
          .populate('category', 'name _id')
          .exec(function(err, wesite){
            CategoryWesite
              .find({})
              .exec(function(err, category){
                res.render('admin/wesiteForm', {
                  title: '更新案例 ' + wesite.title,
                  wesite: wesite,
                  category: category
                })
              })
          })
    }
}

exports.wechatSave = function(req, res){
    var id = req.body.wechat._id;
    var wechatObj = req.body.wechat;
    var _category = wechatObj.category || [];
    var _category;
    if (id) {
        Wechat.findById(id, function(err, wechat) {
            if (err) {
                console.log(err);
            };

            _wechat = _.extend(wechat, wechatObj);
            _wechat.save(function(err, wechat){
                CategoryWechat
                    .find({})
                    .exec(function(err, category){
                        for (var i = 0; i < category.length; i++) {
                           var index = category[i].wechat.indexOf(id);
                           if (index > -1) {
                                category[i].wechat.splice(index, 1);
                                category[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }
                    })

                if(_category){
                if (typeof _category == 'string') {
                    CategoryWechat
                        .findOne({_id: _category})
                        .exec(function(err, category){
                            category.wechat.push(wechat._id)

                            category.save()
                        })
                }else{
                    for (var i = 0; i < _category.length; i++) {
                        
                        CategoryWechat
                            .findOne({_id: _category[i]})
                            .exec(function(err, category){
                                category.wechat.push(wechat._id)
                                category.save()
                            })
                    }
                }}

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/wemedia/wechat/list');
            });
        });
    }else{
        _wechat = new Wechat(wechatObj);
        _wechat.save(function(err, wechat){
            if(_category){
            if (typeof _category == 'string') {
                CategoryWechat
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.wechat.push(wechat._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryWechat
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.wechat.push(wechat._id)
                            category.save()
                        })
                }
            }}

            if (err) {
                console.log(err);
            };

            res.redirect('/admin/wemedia/wechat/list');
        });
    }
}


exports.weboSave = function(req, res){
    var id = req.body.webo._id;
    var weboObj = req.body.webo;
    var _category = weboObj.category || [];
    var _webo;
    if (id) {
        Webo.findById(id, function(err, webo) {
            if (err) {
                console.log(err);
            };

            _webo = _.extend(webo, weboObj);
            _webo.save(function(err, webo){
                CategoryWebo
                    .find({})
                    .exec(function(err, category){
                        for (var i = 0; i < category.length; i++) {
                           var index = category[i].webo.indexOf(id);
                           if (index > -1) {
                                category[i].webo.splice(index, 1);
                                category[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }
                    })

                if(_category){
                if (typeof _category == 'string') {
                    CategoryWebo
                        .findOne({_id: _category})
                        .exec(function(err, category){
                            category.webo.push(webo._id)

                            category.save()
                        })
                }else{
                    for (var i = 0; i < _category.length; i++) {
                        
                        CategoryWebo
                            .findOne({_id: _category[i]})
                            .exec(function(err, category){
                                category.webo.push(webo._id)
                                category.save()
                            })
                    }
                }}

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/wemedia/webo/list');
            });
        });
    }else{
        _webo = new Webo(weboObj);
        _webo.save(function(err, webo){
            if(_category){
            if (typeof _category == 'string') {
                CategoryWebo
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.webo.push(webo._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryWebo
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.webo.push(webo._id)
                            category.save()
                        })
                }
            }}

            if (err) {
                console.log(err);
            };

            res.redirect('/admin/wemedia/webo/list');
        });
    }
}


exports.wesiteSave = function(req, res){
    var id = req.body.wesite._id;
    var wesiteObj = req.body.wesite;
    var _category = wesiteObj.category || [];
    var _wesite;
    if (id) {
        Wesite.findById(id, function(err, wesite) {
            if (err) {
                console.log(err);
            };

            _wesite = _.extend(wesite, wesiteObj);
            _wesite.save(function(err, wesite){
                CategoryWesite
                    .find({})
                    .exec(function(err, category){
                        for (var i = 0; i < category.length; i++) {
                           var index = category[i].wesite.indexOf(id);
                           if (index > -1) {
                                category[i].wesite.splice(index, 1);
                                category[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }
                    })

                if(_category){
                if (typeof _category == 'string') {
                    CategoryWesite
                        .findOne({_id: _category})
                        .exec(function(err, category){
                            category.wesite.push(wesite._id)

                            category.save()
                        })
                }else{
                    for (var i = 0; i < _category.length; i++) {
                        
                        CategoryWesite
                            .findOne({_id: _category[i]})
                            .exec(function(err, category){
                                category.wesite.push(wesite._id)
                                category.save()
                            })
                    }
                }}

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/wemedia/wesite/list');
            });
        });
    }else{
        _wesite = new Wesite(wesiteObj);
        _wesite.save(function(err, wesite){
            if(_category){
            if (typeof _category == 'string') {
                CategoryWesite
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.wesite.push(wesite._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryWesite
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.wesite.push(wesite._id)
                            category.save()
                        })
                }
            }}

            if (err) {
                console.log(err);
            };

            res.redirect('/admin/wemedia/wesite/list');
        });
    }
}


exports.wechatDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Wechat.remove({ _id: { $in: delList } }, function(err, wechat){
            CategoryWechat
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].wechat.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].wechat.splice(index, 1);
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
exports.weboDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Webo.remove({ _id: { $in: delList } }, function(err, webo){
            CategoryWebo
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].webo.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].webo.splice(index, 1);
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
exports.wesiteDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Wesite.remove({ _id: { $in: delList } }, function(err, wesite){
            CategoryWesite
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].wesite.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].wesite.splice(index, 1);
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

exports.categoryWechatDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryWechat.remove({ _id: { $in: delList } }, function(err, category){
            Wechat
                .find({})
                .exec(function(err, wechat){
                    for (var i = 0; i < wechat.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = wechat[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                wechat[i].category.splice(index, 1);
                                wechat[i].save()
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

exports.categoryWeboDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryWebo.remove({ _id: { $in: delList } }, function(err, category){
            Webo
                .find({})
                .exec(function(err, webo){
                    for (var i = 0; i < webo.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = webo[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                webo[i].category.splice(index, 1);
                                webo[i].save()
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

exports.categoryWesiteDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryWesite.remove({ _id: { $in: delList } }, function(err, category){
            Wesite
                .find({})
                .exec(function(err, wesite){
                    for (var i = 0; i < wesite.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = wesite[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                wesite[i].category.splice(index, 1);
                                wesite[i].save()
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

exports.categoryWechatList = function(req, res){
    CategoryWechat
        .find({})
        .populate('wechat', 'name')
        .exec(function(err, category){
            res.render('admin/wechatCategoryList', {
                title: '微信标签',
                category: category
            })
        })
}


exports.categoryWeboList = function(req, res){
    CategoryWebo
        .find({})
        .populate('webo', 'name')
        .exec(function(err, category){
            res.render('admin/weboCategoryList', {
                title: '微博标签',
                category: category
            })
        })
}


exports.categoryWesiteList = function(req, res){
    CategoryWesite
        .find({})
        .populate('wesite', 'name')
        .exec(function(err, category){
            res.render('admin/wesiteCategoryList', {
                title: '网站媒体标签',
                category: category
            })
        })
}

exports.categoryWechatSave = function(req, res){
    var categoryObj = req.body.category;
    var _category;

    _category = new CategoryWechat(categoryObj);

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

exports.categoryWeboSave = function(req, res){
    var categoryObj = req.body.category;
    var _category;

    _category = new CategoryWebo(categoryObj);

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

exports.categoryWesiteSave = function(req, res){
    var categoryObj = req.body.category;
    var _category;

    _category = new CategoryWesite(categoryObj);

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

