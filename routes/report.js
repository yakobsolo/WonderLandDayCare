const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// get report dashboard
router.get('/dashboard', reportController.getReportDashboard);

// post report
router.post('/getreport', reportController.getReport);

module.exports = router;