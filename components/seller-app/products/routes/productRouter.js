const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenAccount = require('../../../../middleware/authen');
const authenRole = require('../../../../middleware/detectRole');

<<<<<<< HEAD
router.get('/',productController.listProduct);
router.get('/add',productController.addProduct);
router.post('/create',productController.createProduct);
router.post('/delete/:id',productController.deleteProduct);
router.get('/edit/:id',productController.editProduct);
router.post('/update',productController.updateProduct);
=======
router.get('/', authenAccount.isLoggedIn, authenRole.isSeller,productController.listProduct);
router.get('/add', authenAccount.isLoggedIn, authenRole.isSeller,productController.addProduct);
router.post('/create', authenAccount.isLoggedIn, authenRole.isSeller,productController.createProduct);
router.post('/delete/:id', authenAccount.isLoggedIn, authenRole.isSeller,productController.deleteProduct);
router.get('/edit/:id', authenAccount.isLoggedIn, authenRole.isSeller,productController.editProduct);
router.post('/update', authenAccount.isLoggedIn, authenRole.isSeller,productController.updateProduct);
>>>>>>> bf637c32e1c8a8c7e00ff0e367e20266ce646ff8

module.exports = router;