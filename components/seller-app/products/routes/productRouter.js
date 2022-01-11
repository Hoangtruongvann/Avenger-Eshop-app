const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenAccount = require('../../../../middleware/authen');
const authenRole = require('../../../../middleware/detectRole');

router.get('/', authenAccount.isLoggedIn, authenRole.isSeller,productController.listProduct);
router.get('/add', authenAccount.isLoggedIn, authenRole.isSeller,productController.addProduct);
router.post('/create', authenAccount.isLoggedIn, authenRole.isSeller,productController.createProduct);
router.post('/delete', authenAccount.isLoggedIn, authenRole.isSeller,productController.deleteProduct);
router.get('/edit/:id', authenAccount.isLoggedIn, authenRole.isSeller,productController.editProduct);
router.post('/update', authenAccount.isLoggedIn, authenRole.isSeller,productController.updateProduct);

module.exports = router;