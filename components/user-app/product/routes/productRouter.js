const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/list',productController.list);

router.get('/detail/:product_id', productController.detail)

module.exports = router;