const express = require('express');
const loginController = require('../controllers/login');
const router = express.Router();

router.get('/', loginController.getLogin);

module.exports = router;
