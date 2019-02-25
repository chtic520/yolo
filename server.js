var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var mongokeeper = require('./public/js/mongokeeper');
var config=require('./config.global');
var bodyParser = require('body-parser');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')(session);
var multipart = require('connect-multiparty');
var util = require("util");
var logger = require('morgan');
var port = process.env.PORT || 3000;
var app = express();

var dbUrl = util.format('mongodb://%s:%s@%s:%d/%s', config.dbConfig.userid, config.dbConfig.password, config.dbConfig.host, config.dbConfig.port, config.dbConfig.database);

// process.env.NODE_ENV='development';
// process.env.NODE_ENV='production';

// if (process.env.NODE_ENV=='development') { 
//     process.env.MONGO_DB_STR = config.dev_dbUrl;
// }
mongokeeper.config(config.dbConfig);

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(multipart());
app.use(session({
    secret: 'hostel',
    store: new mongoStore({
        url: dbUrl,
        // url: config.dev_dbUrl,
        collection: 'sessions'
    }),
    cookie: {},
    resave: false,
    saveUninitialized: true
}))

// if ('development'=== app.get('env')) {
//     app.set('showStackError', true);
//     app.use(logger(':method :url :status'));
//     app.locals.pretty = true;
//     mongoose.set('debug', true);
// }


app.listen(port);

console.log('MyWEB started on port ' + port);



require('./config/routes')(app);
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
