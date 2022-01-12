const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountListController')


router.post('/:id', accountController.delete);
router.get('/', accountController.home);

module.exports = router;

