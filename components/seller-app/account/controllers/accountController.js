const async = require("hbs/lib/async");
const accountService = require('../services/accountService')

exports.profile = async (req, res, next) => {
    try {
        const user = req.user;
        const shop_id = user.user_shop;
        const shop = await accountService.getShop(shop_id);
        res.render('../components/seller-app/account/views/profile', { layout: 'sellerLayout.hbs', shop });
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