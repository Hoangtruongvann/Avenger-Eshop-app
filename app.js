const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expbs = require('express-handlebars');
const session = require('express-session')
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');


// router set up
const indexRouter = require('./components/user-app/home/routes/indexRouter');
const productRouter = require('./components/user-app/product/routes/productRouter');
const cartRouter = require('./components/user-app/cart/routes/cartRouter');
const authRouter = require('./components/user-app/authen/routes/authRouter');
const dashboardRouter = require('./components/seller-app/dashboard/routes/dashboardRouter');
const sellerAccountRouter = require('./components/seller-app/account/routes/accountRouter');
const productAccountRouter = require('./components/seller-app/products/routes/productRouter');
const orderRouter = require('./components/seller-app/orders/routes/ordersRouter');
const adminRouter = require('./components/admin/dashboard/routes/adminRouter');
const accountListRouter = require('./components/admin/accountList/routes/accountListRouter');



const app = express();
// add helper
var hbs = exphbs.create({});
hbs.handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
  });
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
	extname: 'hbs',
	defaultLayout: 'userLayout',
	helpers: {
		'pages': function(pages,page,search_name,block) {
			var accum = '';
			for(var i = 1; i < pages+1; ++i)
			if(i!=page+1)
				accum += block.fn({index:i,search_name:search_name,active:""});
			else
				accum += block.fn({index:i,search_name:search_name,active:"active"});
			return accum;
		},
	}
}));
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
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

//passport
const initialize = require('./config/passport');
initialize(passport);
app.use(passport.initialize());
app.use(passport.session());

//middleware
const authenRole = require('./middleware/detectRole')
const authenAccount = require('./middleware/authen')
const oldShop = require('./middleware/isOldShop')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async function(req, res, next) {
    res.locals.user = req.user;
    if (req?.user?.user_id) {
        [res.locals.cartQuantity] = await require('./components/user-app/cart/services/cartDetail').count(req.user.user_id);

    }
    next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/seller/orders',oldShop.isOld, orderRouter);
app.use('/seller/account', authenAccount.isLoggedIn, authenRole.isSeller, sellerAccountRouter);
app.use('/seller', authenAccount.isLoggedIn, authenRole.isSeller, oldShop.isOld,dashboardRouter);
app.use('/seller/products', authenAccount.isLoggedIn, authenRole.isSeller,oldShop.isOld, productAccountRouter);
app.use('/admin', authenAccount.isLoggedIn, authenRole.isAdmin, adminRouter);
app.use('/admin/accountList', authenAccount.isLoggedIn, authenRole.isAdmin, accountListRouter);
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