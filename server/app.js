var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var showGoods = require('./routes/goods');
// var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  console.log("originalUrl is "+req.originalUrl);
  var flagg=parseInt(req.originalUrl.indexOf('/goods'));
  var reqUrl=req.originalUrl;
  console.log(flagg);
  // next();
  if(req.cookies.userId){
    console.log("mmm");
    next();
  }
  else{
    console.log("else");
    if(reqUrl=='/goods/login'||reqUrl=='/goods/logout'||parseInt(reqUrl.indexOf('/goods/list'))>-1){
      console.log("nnn");
      next();
    }
    else{
      console.log("9090");
      res.json({
        status:'10001',
        msg:'当前未登陆',
        result:''
      });
    }
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', showGoods);
// app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
