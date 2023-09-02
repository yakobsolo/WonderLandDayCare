const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/servicesController');

router.get('/dashboard', servicesController.getAllServices);
router.get('/add', servicesController.renderAddService);
router.post('/add', servicesController.addService);
router.get('/:id/edit', servicesController.renderEditService);
router.post('/:id/edit', servicesController.editService);
router.post('/:id/delete', servicesController.deleteService);

module.exports = router;
