const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expbs= require('express-handlebars');
const session = require('express-session')
const passport = require('passport');
const flash = require('express-flash');
// router set up
const indexRouter = require('./components/user-app/home/routes/indexRouter');
const productRouter = require('./components/user-app/product/routes/productRouter');
const cartRouter = require('./components/user-app/cart/routes/cartRouter');
const authRouter = require('./components/user-app/authen/routes/authRouter');
const dashboardRouter = require('./components/seller-app/dashboard/routes/dashboardRouter');
const sellerAccountRouter = require('./components/seller-app/account/routes/accountRouter');
const productAccountRouter = require('./components/seller-app/products/routes/productRouter');



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(flash());

//session
app.use(
  session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
  }),
);

//passport
const initialize = require('./config/passport');
initialize(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/products', productRouter);
app.use('/cart',cartRouter);

app.use('/seller',dashboardRouter);
app.use('/seller/account',sellerAccountRouter);
app.use('/seller/products',productAccountRouter);

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
