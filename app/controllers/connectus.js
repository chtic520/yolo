var _ = require('underscore');
var Connectus = require('../models/connectus');
var fs = require('fs');
var path = require('path');

exports.new = function(req, res){
    res.render('admin/connectusForm', {
      title: '新增',
      connectus: {}
    })
};

exports.view = function(req, res){
    var _connectus = {}
    Connectus
        .find({})
        .exec(function(err, connectus){
            if (err) {
                console.log(err);
            };

            if (connectus.length > 0) {
                _connectus = connectus[0]
            }

            res.render('admin/connectus', {
                title: '联系我们',
                connectus: _connectus
            });
        })
};

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
      Connectus
	      .findOne({_id: id})
	      .exec(function(err, connectus){
	        res.render('admin/connectusForm', {
	          title: '更新',
	          connectus: connectus
	        })
	      })
    }
};

exports.save = function(req, res){
    var id = req.body.connectus._id;
    var connectusObj = req.body.connectus;
    var _connectus;

    if (id) {
        Connectus.findById(id, function(err, connectus) {
            if (err) {
                console.log(err);
            };

            _connectus = _.extend(connectus, connectusObj);
            _connectus.save(function(err, connectus){
                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/connectus/view');
            });
        });
    }
    else{
        _connectus = new Connectus(connectusObj);

        _connectus.save(function(err, connectus){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/connectus/view')
        });
    }
};