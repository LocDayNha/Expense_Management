var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// session,cookies
const session=require('express-session');

//import Model
require('./components/Category/CategoryModel');
require('./components/Transaction/TransactionModel');
require('./components/ManagerTransaction/ManagerTransactionModel');


// API


var UserAPIRouter = require('./routes/api/UserAPI')
var CategoryApiRouter = require('./routes/api/CategoryApi')
var TransactionAPIRouter = require('./routes/api/TransactionAPI')
var ManagerTransactionAPIRouter = require('./routes/api/ManagerTransactionAPI')






var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// API 
// http://localhost:3000/user/api
app.use('/user/api', UserAPIRouter);


// khai bao thong tin cua session
app.use(session({
  secret: 'iloveyou',//bi mat.
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
mongoose.connect('mongodb+srv://adminLucas:123abc@cluster0.9he83yb.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

  app.use('/', indexRouter);
// API 
// http://localhost:3000/user/api
app.use('/user/api', UserAPIRouter);

// http://localhost:3000/category/api
app.use('/category/api', CategoryApiRouter);

// http://localhost:3000/transaction/api
app.use('/transaction/api', TransactionAPIRouter);

// http://localhost:3000/managerTransaction/api
app.use('/managerTransaction/api', ManagerTransactionAPIRouter);
  


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
