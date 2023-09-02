const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController');

// GET /children/register
router.get('/register', childController.getregisterChild);

// GET child view
router.get('/:childId/details', childController.getViewChild);

//POSt Change Status
router.post('/:childId/status', childController.changeStatus);

  
// POST /children/register
router.post('/register', childController.registerChild);

  // GET /children/dashboard
router.get('/dashboard', childController.getChildDashboard);



// GET /children/:childId/edit (to render the edit child page)
router.get('/:childId/edit', childController.getEditChild);

// POST /children/:childId/edit (to update a child)
router.post('/:childId/edit', childController.updateChild);

// POST /children/:childId/delete (to delete a child)
router.post('/:childId/delete', childController.deleteChild);







module.exports = router;
