const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/list',productController.list);

router.get('/detail/:product_id', productController.detail)

router.post('/detail/:product_id', productController.addReivew)

router.get('/fetch', productController.fetching);

router.get('/search', productController.search);

module.exports = router;