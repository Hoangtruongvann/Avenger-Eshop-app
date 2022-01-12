const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/adminController')

router.get('/', dashboardController.home);

module.exports = router;

