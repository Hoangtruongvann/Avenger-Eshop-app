const async = require("hbs/lib/async");
const accountService = require('../services/accountService')

exports.profile = async (req, res, next) => {
    try {
        const user = req.user;
        const shop_id = user.user_shop;
        const shop = await accountService.getShop(shop_id);
        const products = await accountService.countProduct(shop_id);
        const orders = await accountService.countOrder(shop_id);
        const reviews = await accountService.countReview(shop_id);
        res.render('../components/seller-app/account/views/profile', { layout: 'sellerLayout.hbs', shop,countProduct:products.count,countOrder:orders.count, countReview:reviews.count});
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const shop_id = req.user.user_shop;
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        };
        const shop = {
            shop_name: req.body.shop_name,
            shop_phone: req.body.shop_phone,
            shop_email: req.body.shop_email,
            address: req.body.shop_address,
            descriptions: req.body.descriptions
        };
        console.log(user, shop);
        console.log(user_id, shop_id);
        const newUser = await accountService.updateUser(user, user_id);
        const newShop = await accountService.updateShop(shop, shop_id);
        console.log(newShop, newUser);
        // req.logIn(newUser, function (error) {
        //     if (!error) {
        //         console.log('succcessfully updated user');
              
        //     }
        //     else
        //     {
        //         console.log(error);
        //     }
        // });
        // res.end(); // important to update session
        res.redirect('/seller/account?message=success"');
    }
    catch (error) {
        next(error);
    }

}

exports.init = (req, res, next)=>{
    res.render('../components/seller-app/account/views/init', {layout:'sellerLayout'})
}

exports.initP = async (req, res, next)=>{

    let newShop = await accountService.createShop(req.body)
    newShop = newShop.dataValues;
    let newUser = req.user
    newUser.user_shop = newShop.shop_id;
    await accountService.updateUser(newUser, newUser.user_id)



    res.redirect('/')
}