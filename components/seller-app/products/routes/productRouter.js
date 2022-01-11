const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.listProduct);
router.get('/add', productController.addProduct);
router.post('/create', productController.createProduct);
router.post('/delete', productController.deleteProduct);
router.get('/edit/:id', productController.editProduct);
router.post('/update', productController.updateProduct);

module.exports = router;