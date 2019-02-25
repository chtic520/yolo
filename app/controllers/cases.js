var _ = require('underscore');
var Cases = require('../models/cases');
var CategoryCases = require('../models/categorycases');
var fs = require('fs');
var path = require('path');

//addCases
exports.new = function(req, res){

    CategoryCases
        .find({})
        .exec(function(err, category){
        res.render('admin/casesForm', {
              title: '新增案例',
              cases: {},
              category: category
            })
        })
};

exports.list = function(req, res){
    Cases
        .find({})
        .populate('category', 'name')
        .sort('meta.createAt')
        .exec(function(err, cases){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < cases.length; i++){
              cases[i].displayindex && onitems++;
            }

            res.render('admin/casesList', {
                title: '创意策划',
                cases: cases,
                onitems: onitems
            });
        })
};

exports.categoryList = function(req, res){
    CategoryCases
        .find({})
        .populate('cases', 'title')
        .sort('meta.createAt')
        .exec(function(err, category){
            if (err) {
                console.log(err);
            };

            res.render('admin/casesCategoryList', {
                title: '案例标签列表',
                category: category
            })
        })
}

exports.del = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Cases.remove({ _id: { $in: delList } }, function(err, cases){
            CategoryCases
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].cases.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].cases.splice(index, 1);
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
        CategoryCases.remove({ _id: { $in: delList } }, function(err, category){
            Cases
                .find({})
                .exec(function(err, cases){
                    for (var i = 0; i < cases.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = cases[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                cases[i].category.splice(index, 1);
                                cases[i].save()
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
        Cases
          .findOne({_id: id})
          .populate('category', 'name _id')
          .exec(function(err, cases){
            CategoryCases
              .find({})
              .exec(function(err, category){
                res.render('admin/casesForm', {
                  title: '更新案例 ' + cases.title,
                  cases: cases,
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
      Cases.findById(id, function(err, cases) {
        if (err) {
            console.log(err);
        };

        cases.displayindex = on;
        cases.save(function(err, cases){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.cases._id;
    var casesObj = req.body.cases;
    var _category = casesObj.category;
    var _cases;

    if (id) {
        Cases.findById(id, function(err, cases) {
            if (err) {
                console.log(err);
            };

            _cases = _.extend(cases, casesObj);
            _cases.save(function(err, cases){
                CategoryCases
                    .find({})
                    .exec(function(err, category){
                        for (var i = 0; i < category.length; i++) {
                           var index = category[i].cases.indexOf(id);
                           if (index > -1) {
                                category[i].cases.splice(index, 1);
                                category[i].save()
                           }
                        }
                        if (err) {
                            console.log(err)
                        }
                    })
                if(_category){
                if (typeof _category == 'string') {
                    CategoryCases
                        .findOne({_id: _category})
                        .exec(function(err, category){
                            category.cases.push(cases._id)

                            category.save()
                        })
                }else{
                    for (var i = 0; i < _category.length; i++) {
                        
                        CategoryCases
                            .findOne({_id: _category[i]})
                            .exec(function(err, category){
                                category.cases.push(cases._id)
                                category.save()
                            })
                    }
                }}


                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/cases/list');
            });
        });
    }
    else{
        _cases = new Cases(casesObj);

        _cases.save(function(err, cases){
            if(_category){
            if (typeof _category == 'string') {
                CategoryCases
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.cases.push(cases._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryCases
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.cases.push(cases._id)
                            category.save()
                        })
                }
            }}
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/cases/list')
        });
    }
};



exports.category = function(req, res){
    var categoryObj = req.body.category;
    var _category;

    _category = new CategoryCases(categoryObj);

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
