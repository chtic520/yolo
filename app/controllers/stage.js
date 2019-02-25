var _ = require('underscore');
var Stage = require('../models/stage');
var CategoryStage = require('../models/categorystage');
var fs = require('fs');
var path = require('path');

//addStar
exports.new = function(req, res){

    CategoryStage
        .find({})
        .exec(function(err, category){
        res.render('admin/stageForm', {
              title: '添加舞美设备',
              stage: {},
              category: category
            })
        })
};

exports.list = function(req, res){
    Stage
        .find({})
        .populate('category', 'name')
        .sort('meta.createAt')
        .exec(function(err, stage){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < stage.length; i++){
              stage[i].displayindex && onitems++;
            }

            res.render('admin/stageList', {
                title: '舞美设备',
                stage: stage,
                onitems: onitems
            });
        })
};

exports.categoryList = function(req, res){
    CategoryStage
        .find({})
        .populate('stage', 'name')
        .sort('meta.createAt')
        .exec(function(err, category){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < category.length; i++){
              category[i].displayindex && onitems++;
            }

            res.render('admin/stageCategoryList', {
                title: '舞美设备类型列表',
                category: category,
                onitems: onitems
            })
        })
}

exports.categoryDisplay = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      CategoryStage.findById(id, function(err, category) {
        if (err) {
            console.log(err);
        };

        category.displayindex = on;
        category.save(function(err, category){
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
        Stage.remove({ _id: { $in: delList } }, function(err, stage){
            CategoryStage
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].stage.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].stage.splice(index, 1);
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
        CategoryStage.remove({ _id: { $in: delList } }, function(err, stage){
            Stage
                .find({})
                .exec(function(err, stage){
                    for (var i = 0; i < stage.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = stage[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                stage[i].category.splice(index, 1);
                                stage[i].save()
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
        Stage
          .findOne({_id: id})
          .populate('category', 'name _id')
          .exec(function(err, stage){
            CategoryStage
              .find({})
              .exec(function(err, category){
                res.render('admin/stageForm', {
                  title: '更新舞美设备 ' + stage.name,
                  stage: stage,
                  category: category
                })
              })
          })
    }
};

exports.categoryUpdate = function(req, res){
    var id = req.params.id;

    if (id) {
        CategoryStage
            .findOne({_id: id})
            .sort('meta.createAt')
            .exec(function(err, category){
                if (err) {
                    console.log(err);
                };

                res.render('admin/stageCategoryForm', {
                    title: '更新 ' + category.name,
                    category: category
                })
            })
    }
}


exports.display = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Stage.findById(id, function(err, stage) {
        if (err) {
            console.log(err);
        };

        stage.displayindex = on;
        stage.save(function(err, stage){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.stage._id;
    var stageObj = req.body.stage;
    var _category = stageObj.category;
    var _stage;

    if (id) {
        Stage.findById(id, function(err, stage) {
            if (err) {
                console.log(err);
            };

            _stage = _.extend(stage, stageObj);
            _stage.save(function(err, stage){
                CategoryStage
                    .find({})
                    .exec(function(err, category){
                        for (var i = 0; i < category.length; i++) {
                           var index = category[i].stage.indexOf(id);
                           if (index > -1) {
                                category[i].stage.splice(index, 1);
                                category[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }
                    })
                
                if(_category){
                if (typeof _category == 'string') {
                    CategoryStage
                        .findOne({_id: _category})
                        .exec(function(err, category){
                            category.stage.push(stage._id)

                            category.save()
                        })
                }else{
                    for (var i = 0; i < _category.length; i++) {
                        
                        CategoryStage
                            .findOne({_id: _category[i]})
                            .exec(function(err, category){
                                category.stage.push(stage._id)
                                category.save()
                            })
                    }
                }}


                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/stage/list');
            });
        });
    }
    else{
        _stage = new Stage(stageObj);

        _stage.save(function(err, stage){
            if(_category){
            if (typeof _category == 'string') {
                CategoryStage
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.stage.push(stage._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryStage
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.stage.push(stage._id)
                            category.save()
                        })
                }
            }}
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/stage/list')
        });
    }
};

exports.category = function(req, res){
    var id = req.body.category._id;
    var categoryObj = req.body.category;
    var _category;

    if (id) {
        CategoryStage.findById(id, function(err, category) {
            if (err) {
                console.log(err);
            };

            _category = _.extend(category, categoryObj);
            _category.save(function(err, category){

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/stage/category');
            });
        });
    }else{

        _category = new CategoryStage(categoryObj);

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
