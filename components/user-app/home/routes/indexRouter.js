const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/category/:id', homeController.category)

router.get('/',homeController.home);

module.exports = router;