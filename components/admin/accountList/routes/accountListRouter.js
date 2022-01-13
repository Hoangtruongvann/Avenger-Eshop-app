const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountListController')


router.post('/delete/:id', accountController.delete);
router.post('/lock/:id', accountController.lock);
router.post('/unlock/:id', accountController.unlock);
router.get('/', accountController.home);

module.exports = router;

 