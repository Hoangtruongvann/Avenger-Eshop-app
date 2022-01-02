const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authenAccount = require('../../../../middleware/authen');
const authenRole = require('../../../../middleware/detectRole');
router.get('/', authenAccount.isLoggedIn, authenRole.isCustomer, ordersController.show);
module.exports = router;