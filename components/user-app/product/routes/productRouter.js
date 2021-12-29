const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/list',productController.list);

router.get('/detail/:product_id', productController.detail)

router.get('/fetch', productController.fetching);

router.get('/search', productController.search);

module.exports = router;