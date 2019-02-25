var User = require('../models/user');
var _ = require('underscore');

exports.showRegister = function(req, res){
    res.render('admin/register',{
        title: '注册'
    })
};

exports.new = function(req, res){

    res.render('admin/userForm', {
      title: '新增用户',
      user: {}
    })
}

exports.showLogin = function(req, res){
    res.render('admin/login',{
        title: '登录'
    })
};

exports.save = function(req, res){
    var userObj = req.body.user;
    var _user;

    _user = new User(userObj);

    _user.save(function(err, user){
        if (err) {
            console.log(err)
        };

        res.redirect('/admin/users/list')
    });
}

exports.login = function(req, res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    

    User.findOne({name: name}, function(err, user){
        if (err) {
            console.log(err);
        }

        if(!user){
            return res.json({
                success: 0,
                msg: '用户名或密码错误！请重试！'
            });
        }else{
            user.comparePassword(password, function(err, isMatch){
                if(err){
                    console.log(err);
                }

                if(isMatch){
                    req.session.user = user;

                    return res.json({
                        success: 1,
                        msg: '登录成功！'
                    });
                }
                else{
                    return res.json({
                        success: 0,
                        msg: '用户名或密码错误！请重试2！'
                    });
                }
            })
        }

    })
};

exports.register = function(req, res){
  var _user = req.body.user;

  User.findOne({name: _user.name}, function(err, user){
    if (err) {
      console.log(err);
    };

    if (user) {
      res.json({
        success: 0,
        msg: '用户名已存在！可能是由于你注册时间太长被人抢注啦！'
      });
    }
    else{
      var user = new User(_user);

      user.save(function(err, user){
        if(err){
          console.log(err);
          res.json({
            success: 0,
            msg: '未知错误，注册失败！'
          })
          return;
        }
        req.session.user = user;

        res.json({
          success: 1,
          msg: '登录成功'
        })
      })
    }
  })
};

exports.updater = function(req, res){

    var id = req.body.user.id;
    var role = req.body.user.role;

    if (id) {
        User.update({_id: id},{$set:{role: role}}, function(err){
            if (err) {
                console.log(err);
                return res.json({
                    success: 0
                })
            };

            return res.json({
                success: 1,
                msg: '用户权限更新成功！'
            })
        });
    }
}

exports.updatep = function(req, res){

    var id = req.body.user.id;
    var password = req.body.user.password;

    if (id) {
        User
          .findOne({_id: id})
          .exec(function(err, user){
            user.password = password
            user.save(function(err, user){
              if (err) {
                return res.json({
                        success: 0
                      })
              }

              return res.json({
                success: 1,
                msg: "密码修改成功！"
              })
            })
          })
    }
}

exports.logout = function(req, res){
    delete req.session.user;

    res.redirect('/')
};

exports.list = function(req, res){
    User.fetch(function(err, users){
        if (err) {
            console.log(err);
        };

        res.render('admin/userList', {
            title: '用户管理',
            users: users
        });
    })
};

exports.del = function(req, res){

    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        User.remove({ _id: { $in: delList } }, function(err, cases){
            if (err) {
                console.log(err)
            }else{
                res.json({success: 1});
            }
        });
    }
};

exports.signinRequired = function(req, res, next){
    var user = req.session.user;

    if (!user) {
        return res.redirect('/login?msg=nologin');
    }

    next();
}

exports.adminRequired = function(req, res, next){
    var user = req.session.user;

    if (user.role < 50) {
        return res.redirect('/login?msg=norole');
    }

    next();
}

exports.adminRole = function(req, res, next){
    var user = req.session.user;

    if (user.role != 100) {
        return res.json({
            success: false,
            msg: '你没有权限执行此操作，请联系管理员！'
        });
    }else{
        return res.json({
            success: true
        });
    }
}