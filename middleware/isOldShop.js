// const userM = require('../components/user-app/authen/services/users')

class isOldShop{

    async isOld (req, res, next){
        if(req.path == '/seller/account/initShop'){
            return next();
        }
        // let user = await userM.findUserById(req.user.user_id)
        if (req.user.user_shop){
            return next();
        }
        return res.redirect('/seller/account/initShop')
    }

}

module.exports = new isOldShop();