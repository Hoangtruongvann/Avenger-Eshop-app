const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')
const authenAccount = require('../../../../middleware/authen')
const authenRole = require('../../../../middleware/detectRole')

router.get('/add', cartController.add);

router.post('/update',authenAccount.isLoggedIn,authenRole.isCustomer , cartController.update);

router.get('/', authenAccount.isLoggedIn,authenRole.isCustomer , cartController.cart);

router.post('/remove/:id',  authenAccount.isLoggedIn,authenRole.isCustomer, cartController.remove);

module.exports = router;
