var _ = require('underscore');
var Star = require('../models/star');
var CategoryStar = require('../models/categorystar');
var fs = require('fs');
var path = require('path');

//addStar
exports.new = function(req, res){

    CategoryStar
        .find({})
        .exec(function(err, category){
        res.render('admin/starForm', {
              title: '添加明星',
              star: {},
              category: category
            })
        })
};

exports.list = function(req, res){
    Star
        .find({})
        .populate('category', 'name')
        .sort('meta.createAt')
        .exec(function(err, star){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < star.length; i++){
              star[i].displayindex && onitems++;
            }

            res.render('admin/starList', {
                title: '明星资源',
                star: star,
                onitems: onitems
            });
        })
};

exports.categoryList = function(req, res){
    CategoryStar
        .find({})
        .populate('star', 'name')
        .sort('meta.createAt')
        .exec(function(err, category){
            if (err) {
                console.log(err);
            };

            res.render('admin/starCategoryList', {
                title: '明星标签列表',
                category: category
            })
        })
}

exports.del = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Star.remove({ _id: { $in: delList } }, function(err, star){
            CategoryStar
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].star.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].star.splice(index, 1);
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
        CategoryStar.remove({ _id: { $in: delList } }, function(err, star){
            Star
                .find({})
                .exec(function(err, star){
                    for (var i = 0; i < star.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = star[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                star[i].category.splice(index, 1);
                                star[i].save()
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
        Star
          .findOne({_id: id})
          .populate('category', 'name _id')
          .exec(function(err, star){
            CategoryStar
              .find({})
              .exec(function(err, category){
                res.render('admin/starForm', {
                  title: '更新明星 ' + star.name,
                  star: star,
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
      Star.findById(id, function(err, star) {
        if (err) {
            console.log(err);
        };

        star.displayindex = on;
        star.save(function(err, star){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.star._id;
    var starObj = req.body.star;
    var _category = starObj.category;
    var _star;

    if (id) {
        Star.findById(id, function(err, star) {
            if (err) {
                console.log(err);
            };

            _star = _.extend(star, starObj);
            _star.save(function(err, star){
                CategoryStar
                    .find({})
                    .exec(function(err, category){
                        for (var i = 0; i < category.length; i++) {
                           var index = category[i].star.indexOf(id);
                           if (index > -1) {
                                category[i].star.splice(index, 1);
                                category[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }
                    })

                if(_category){
                if (typeof _category == 'string') {
                    CategoryStar
                        .findOne({_id: _category})
                        .exec(function(err, category){
                            category.star.push(star._id)

                            category.save()
                        })
                }else{
                    for (var i = 0; i < _category.length; i++) {
                        
                        CategoryStar
                            .findOne({_id: _category[i]})
                            .exec(function(err, category){
                                category.star.push(star._id)
                                category.save()
                            })
                    }
                }}


                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/star/list');
            });
        });
    }
    else{
        _star = new Star(starObj);

        _star.save(function(err, star){
            if(_category){
            if (typeof _category == 'string') {
                CategoryStar
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.star.push(star._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryStar
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.star.push(star._id)
                            category.save()
                        })
                }
            }}
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/star/list')
        });
    }
};


exports.category = function(req, res){
    var categoryObj = req.body.category;
    var _category;

    _category = new CategoryStar(categoryObj);

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
