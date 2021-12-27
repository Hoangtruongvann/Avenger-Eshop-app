const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/',productController.listProduct);
router.get('/add',productController.addProduct);

router.get('/edit/:id',productController.editProduct);
router.post('/update/:id',productController.updateProduct);

module.exports = router;