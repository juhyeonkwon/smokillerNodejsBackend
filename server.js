var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
let login = require('./routes/users/login');
let photo = require('./routes/photo/photo')
let signup = require('./routes/users/signup');
let userlist = require('./routes/users/userlist')
let modify_pw = require('./routes/users/modifypw');
let getImage = require('./routes/getImage.js');



var app = express();

app.use(cors({ origin : '*' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ limit: 5000000, extended:true, parameterLimit : 500000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/modify_pw', modify_pw);
app.use('/api/userlist', userlist);
app.use('/api/getImage', getImage);
app.use('/api/photo', photo);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});








app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(3333, '192.168.0.8', function() {
  console.log('server is running in 3333')
});

module.exports = app;
