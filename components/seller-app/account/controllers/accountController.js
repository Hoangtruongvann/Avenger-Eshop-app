const async = require("hbs/lib/async");
const accountService = require('../services/accountService')

exports.profile =  async (req,res,next) =>{
    const user = req.user;
    const shop_id = user.user_shop;
    const shop = await accountService.getShop(shop_id);
    res.render('../components/seller-app/account/views/profile',{layout: 'sellerLayout.hbs',shop});
}