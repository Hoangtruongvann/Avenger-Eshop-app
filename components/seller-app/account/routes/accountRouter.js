const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController')
const authenAccount = require('../../../../middleware/authen');
const authenRole = require('../../../../middleware/detectRole');

router.get('/', authenAccount.isLoggedIn, authenRole.isSeller,accountController.profile);

module.exports = router;