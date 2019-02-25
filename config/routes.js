var Error_ = require('../app/controllers/errorhandle');
var Index = require('../app/controllers/index');
var Cases = require('../app/controllers/cases');
var Star = require('../app/controllers/star');
var WebStar = require('../app/controllers/webstar');
var Wemedia = require('../app/controllers/wemedia');
var Stage = require('../app/controllers/stage');
var News = require('../app/controllers/news');
var User = require('../app/controllers/user');
var ConnectUs = require('../app/controllers/connectus');
var Front = require('../app/controllers/front');

module.exports = function(app){
	//pre handle user
	app.use(function(req, res, next){
	    var _user = req.session.user;

        app.locals.user = _user;

	    next();
	})

	
	
	/*-----Front-----*/
	//Index
	app.get('/', Index.index);

	//Reative
	// app.get('/reative', Reative.index);

	//Cases
	app.get('/cases', Front.cases);
	app.get('/cases/search', Front.caseSearch);

	//Star
	app.get('/star', Front.star);
	app.get('/star/search', Front.starSearch);

	//Webstar
	app.get('/webstar', Front.webstar);
	app.get('/webstar/search', Front.webstarSearch);

	//Wemedia
	app.get('/wemedia/wechat', Front.wechat);
	app.get('/wemedia/wechat/search', Front.wechatSearch);
	app.get('/wemedia/webo', Front.webo);
	app.get('/wemedia/webo/search', Front.weboSearch);
	app.get('/wemedia/wesite', Front.wesite);
	app.get('/wemedia/wesite/search', Front.wesiteSearch);

	//Stage
	app.get('/stage', Front.stage);
	app.get('/stage/search', Front.stageSearch);

	//News
	app.get('/news', Front.news);
	app.get('/news/search', Front.newsSearch);
	app.get('/news/:id', Front.newsDetail);

	//Conectus
	app.get('/connectus', Front.connectus);

	//Search
	// app.get('/search', Index.search);


	/*-----Login & Register-----*/
	app.get('/logout', User.logout);
	app.get('/login', User.showLogin);
	app.post('/login', User.login);
	app.get('/register', User.showRegister);
	app.post('/register', User.register);

	/*-----Admin-----*/
	//Index
	app.get('/admin', User.signinRequired, User.adminRequired, Index.admin);
	app.get('/admin/index', User.signinRequired, User.adminRequired, Index.adminIndex);
	app.get('/admin/banner/new', User.signinRequired, User.adminRequired, Index.bannerNew);
	app.post('/admin/banner/new', User.signinRequired, User.adminRequired, Index.bannerSave);
	app.get('/admin/banner/update/:id', User.signinRequired, User.adminRequired, Index.bannerUpdate);
	app.post('/admin/banner/display', User.signinRequired, User.adminRequired, Index.bannerDisplay);
	app.delete('/admin/banner/del', User.signinRequired, User.adminRequired, Index.bannerDel);
	app.get('/admin/cooperation/new', User.signinRequired, User.adminRequired, Index.cooperationNew);
	app.post('/admin/cooperation/new', User.signinRequired, User.adminRequired, Index.cooperationSave);
	app.get('/admin/cooperation/update/:id', User.signinRequired, User.adminRequired, Index.cooperationUpdate);
	app.post('/admin/cooperation/display', User.signinRequired, User.adminRequired, Index.cooperationDisplay);
	app.delete('/admin/cooperation/del', User.signinRequired, User.adminRequired, Index.cooperationDel);

	//Upload
	app.post('/admin/upload', User.signinRequired, User.adminRequired, Index.upload);

	//Cases
	app.get('/admin/cases/new', User.signinRequired, User.adminRequired, Cases.new);
	app.post('/admin/cases/new', User.signinRequired, User.adminRequired, Cases.save);
	app.get('/admin/cases/list', User.signinRequired, User.adminRequired, Cases.list);
	app.delete('/admin/cases/del', User.signinRequired, User.adminRequired, Cases.del);
	app.get('/admin/cases/update/:id', User.signinRequired, User.adminRequired, Cases.update);
	app.post('/admin/cases/display', User.signinRequired, User.adminRequired, Cases.display);
	app.post('/admin/cases/category', User.signinRequired, User.adminRequired, Cases.category);
	app.get('/admin/cases/category', User.signinRequired, User.adminRequired, Cases.categoryList);
	app.delete('/admin/cases/category', User.signinRequired, User.adminRequired, Cases.categoryDel);

	//User
	app.get('/admin/users/list', User.signinRequired, User.adminRequired, User.list);
	app.delete('/admin/users/del', User.signinRequired, User.adminRequired, User.del);
	app.post('/admin/users/updatep', User.signinRequired, User.adminRequired, User.updatep);
	app.post('/admin/users/updater', User.signinRequired, User.adminRequired, User.updater);
	app.post('/admin/users/new', User.signinRequired, User.adminRequired, User.save);
	app.get('/admin/users/new', User.signinRequired, User.adminRequired, User.new);
	app.post('/admin/users/role', User.signinRequired, User.adminRequired, User.adminRole);

	//Star
	app.get('/admin/star/list', User.signinRequired, User.adminRequired, Star.list);
	app.delete('/admin/star/del', User.signinRequired, User.adminRequired, Star.del);
	app.get('/admin/star/update/:id', User.signinRequired, User.adminRequired, Star.update);
	app.post('/admin/star/new', User.signinRequired, User.adminRequired, Star.save);
	app.get('/admin/star/new', User.signinRequired, User.adminRequired, Star.new);
	app.post('/admin/star/category', User.signinRequired, User.adminRequired, Star.category);
	app.get('/admin/star/category', User.signinRequired, User.adminRequired, Star.categoryList);
	app.delete('/admin/star/category', User.signinRequired, User.adminRequired, Star.categoryDel);
	app.post('/admin/star/display', User.signinRequired, User.adminRequired, Star.display);
 
	//WebStar
	app.get('/admin/webstar/list', User.signinRequired, User.adminRequired, WebStar.list);
	app.delete('/admin/webstar/del', User.signinRequired, User.adminRequired, WebStar.del);
	app.get('/admin/webstar/update/:id', User.signinRequired, User.adminRequired, WebStar.update);
	app.post('/admin/webstar/new', User.signinRequired, User.adminRequired, WebStar.save);
	app.get('/admin/webstar/new', User.signinRequired, User.adminRequired, WebStar.new);
	app.post('/admin/webstar/display', User.signinRequired, User.adminRequired, WebStar.display);

	app.post('/admin/webstar/category', User.signinRequired, User.adminRequired, WebStar.category);
	app.get('/admin/webstar/category', User.signinRequired, User.adminRequired, WebStar.categoryList);
	app.get('/admin/webstar/category/update/:id', User.signinRequired, User.adminRequired, WebStar.categoryUpdate);
	app.delete('/admin/webstar/category', User.signinRequired, User.adminRequired, WebStar.categoryDel);
	
	app.get('/admin/webstar/platform/list',  User.signinRequired, User.adminRequired, WebStar.platform);
	app.get('/admin/webstar/platform/new',  User.signinRequired, User.adminRequired, WebStar.platformNew);
	app.get('/admin/webstar/platform/update/:id',  User.signinRequired, User.adminRequired, WebStar.platformUpdate);
	app.delete('/admin/webstar/platform/del',  User.signinRequired, User.adminRequired, WebStar.platformDel);
	app.post('/admin/webstar/platform/new',  User.signinRequired, User.adminRequired, WebStar.platformSave);
	
	app.get('/admin/webstar/categorytag/list', User.signinRequired, User.adminRequired, WebStar.categoryTagList);
	app.get('/admin/webstar/categorytag/new', User.signinRequired, User.adminRequired, WebStar.categoryTagNew);
	app.post('/admin/webstar/categorytag/save', User.signinRequired, User.adminRequired, WebStar.categoryTagSave);
	app.delete('/admin/webstar/categorytag/del', User.signinRequired, User.adminRequired, WebStar.categoryTagDel);
	app.get('/admin/webstar/categorytag/update/:id', User.signinRequired, User.adminRequired, WebStar.categoryTagUpdate);
	app.post('/admin/webstar/categorytag/display', User.signinRequired, User.adminRequired, WebStar.categoryTagDisplay);

	//Wemedia
	/*app.get('/admin/wemedia/list', User.signinRequired, User.adminRequired, Wemedia.list);
	app.delete('/admin/wemedia/del', User.signinRequired, User.adminRequired, Wemedia.del);
	app.get('/admin/wemedia/update/:id', User.signinRequired, User.adminRequired, Wemedia.update);
	app.post('/admin/wemedia/new', User.signinRequired, User.adminRequired, Wemedia.save);
	app.get('/admin/wemedia/new', User.signinRequired, User.adminRequired, Wemedia.new);
	app.post('/admin/wemedia/category', User.signinRequired, User.adminRequired, Wemedia.category);
	app.get('/admin/wemedia/category', User.signinRequired, User.adminRequired, Wemedia.categoryList);
	app.delete('/admin/wemedia/category', User.signinRequired, User.adminRequired, Wemedia.categoryDel);
	app.get('/admin/wemedia/platform/list',  User.signinRequired, User.adminRequired, Wemedia.platform);
	app.get('/admin/wemedia/platform/new',  User.signinRequired, User.adminRequired, Wemedia.platformNew);
	app.get('/admin/wemedia/platform/update/:id',  User.signinRequired, User.adminRequired, Wemedia.platformUpdate);
	app.delete('/admin/wemedia/platform/del',  User.signinRequired, User.adminRequired, Wemedia.platformDel);
	app.post('/admin/wemedia/platform/new',  User.signinRequired, User.adminRequired, Wemedia.platformSave);
	app.post('/admin/wemedia/platform/display', User.signinRequired, User.adminRequired, Wemedia.platformDisplay);*/
	app.get('/admin/wemedia/list', User.signinRequired, User.adminRequired, Wemedia.index);

	app.get('/admin/wemedia/wechat/list', User.signinRequired, User.adminRequired, Wemedia.wechatList);
	app.get('/admin/wemedia/wechat/new', User.signinRequired, User.adminRequired, Wemedia.wechatNew);
	app.post('/admin/wemedia/wechat/save', User.signinRequired, User.adminRequired, Wemedia.wechatSave);
	app.get('/admin/wemedia/wechat/update/:id', User.signinRequired, User.adminRequired, Wemedia.wechatUpdate);
	app.delete('/admin/wemedia/wechat/del', User.signinRequired, User.adminRequired, Wemedia.wechatDel);
	app.get('/admin/wemedia/wechat/category', User.signinRequired, User.adminRequired, Wemedia.categoryWechatList);
	app.post('/admin/wemedia/wechat/category', User.signinRequired, User.adminRequired, Wemedia.categoryWechatSave);
	app.delete('/admin/wemedia/wechat/category', User.signinRequired, User.adminRequired, Wemedia.categoryWechatDel);

	app.get('/admin/wemedia/webo/list', User.signinRequired, User.adminRequired, Wemedia.weboList);
	app.get('/admin/wemedia/webo/new', User.signinRequired, User.adminRequired, Wemedia.weboNew);
	app.post('/admin/wemedia/webo/save', User.signinRequired, User.adminRequired, Wemedia.weboSave);
	app.get('/admin/wemedia/webo/update/:id', User.signinRequired, User.adminRequired, Wemedia.weboUpdate);
	app.delete('/admin/wemedia/webo/del', User.signinRequired, User.adminRequired, Wemedia.weboDel);
	app.get('/admin/wemedia/webo/category', User.signinRequired, User.adminRequired, Wemedia.categoryWeboList);
	app.post('/admin/wemedia/webo/category', User.signinRequired, User.adminRequired, Wemedia.categoryWeboSave);
	app.delete('/admin/wemedia/webo/category', User.signinRequired, User.adminRequired, Wemedia.categoryWeboDel);

	app.get('/admin/wemedia/wesite/list', User.signinRequired, User.adminRequired, Wemedia.wesiteList);
	app.get('/admin/wemedia/wesite/new', User.signinRequired, User.adminRequired, Wemedia.wesiteNew);
	app.post('/admin/wemedia/wesite/save', User.signinRequired, User.adminRequired, Wemedia.wesiteSave);
	app.get('/admin/wemedia/wesite/update/:id', User.signinRequired, User.adminRequired, Wemedia.wesiteUpdate);
	app.delete('/admin/wemedia/wesite/del', User.signinRequired, User.adminRequired, Wemedia.wesiteDel);
	app.get('/admin/wemedia/wesite/category', User.signinRequired, User.adminRequired, Wemedia.categoryWesiteList);
	app.post('/admin/wemedia/wesite/category', User.signinRequired, User.adminRequired, Wemedia.categoryWesiteSave);
	app.delete('/admin/wemedia/wesite/category', User.signinRequired, User.adminRequired, Wemedia.categoryWesiteDel);

	//Stage
	app.get('/admin/stage/list', User.signinRequired, User.adminRequired, Stage.list);
	app.delete('/admin/stage/del', User.signinRequired, User.adminRequired, Stage.del);
	app.get('/admin/stage/update/:id', User.signinRequired, User.adminRequired, Stage.update);
	app.post('/admin/stage/new', User.signinRequired, User.adminRequired, Stage.save);
	app.get('/admin/stage/new', User.signinRequired, User.adminRequired, Stage.new);
	app.post('/admin/stage/category', User.signinRequired, User.adminRequired, Stage.category);
	app.get('/admin/stage/category', User.signinRequired, User.adminRequired, Stage.categoryList);
	app.delete('/admin/stage/category', User.signinRequired, User.adminRequired, Stage.categoryDel);
	app.get('/admin/stage/category/:id', User.signinRequired, User.adminRequired, Stage.categoryUpdate);
	app.post('/admin/stage/category/display', User.signinRequired, User.adminRequired, Stage.categoryDisplay);

	//News
	app.get('/admin/news/list', User.signinRequired, User.adminRequired, News.list);
	app.delete('/admin/news/del', User.signinRequired, User.adminRequired, News.del);
	app.get('/admin/news/update/:id', User.signinRequired, User.adminRequired, News.update);
	app.post('/admin/news/new', User.signinRequired, User.adminRequired, News.save);
	app.get('/admin/news/new', User.signinRequired, User.adminRequired, News.new);
	app.post('/admin/news/category', User.signinRequired, User.adminRequired, News.category);
	app.get('/admin/news/category', User.signinRequired, User.adminRequired, News.categoryList);
	app.delete('/admin/news/category', User.signinRequired, User.adminRequired, News.categoryDel);
	app.post('/admin/news/display', User.signinRequired, User.adminRequired, News.display);

	//ConnectUs
	app.get('/admin/connectus/view', User.signinRequired, User.adminRequired, ConnectUs.view);
	app.get('/admin/connectus/new', User.signinRequired, User.adminRequired, ConnectUs.new);
	app.post('/admin/connectus/save', User.signinRequired, User.adminRequired, ConnectUs.save);
	app.get('/admin/connectus/update/:id', User.signinRequired, User.adminRequired, ConnectUs.update);

	/*-----Error-----*/
	app.get('/admin/*', Error_.e404);
}