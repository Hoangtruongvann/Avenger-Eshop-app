const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController')
const authenAccount = require('../../../../middleware/authen');
const authenRole = require('../../../../middleware/detectRole');
const oldShop = require('../../../../middleware/isOldShop')


router.get('/', authenAccount.isLoggedIn, authenRole.isSeller,oldShop.isOld ,accountController.profile);
router.post('/update', authenAccount.isLoggedIn, authenRole.isSeller,oldShop.isOld,accountController.update);
router.get('/initShop', authenAccount.isLoggedIn, authenRole.isSeller,accountController.init);
router.post('/initShop', authenAccount.isLoggedIn, authenRole.isSeller,accountController.initP);

module.exports = router;