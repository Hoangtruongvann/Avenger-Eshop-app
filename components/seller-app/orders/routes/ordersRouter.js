const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authenAccount = require('../../../../middleware/authen');
const authenRole = require('../../../../middleware/detectRole');
router.get('/', authenAccount.isLoggedIn, authenRole.isSeller, ordersController.show);
router.get('/detail/:order_id', authenAccount.isLoggedIn, authenRole.isSeller, ordersController.showDetail);
router.get('/edit/:order_id', authenAccount.isLoggedIn, authenRole.isSeller, ordersController.editOrders);
router.post('/update', authenAccount.isLoggedIn, authenRole.isSeller, ordersController.updateOrders)
module.exports = router;