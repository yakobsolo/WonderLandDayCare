const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController.js');






// GET /subscriptions/add (to display the add-food.ejs template)
router.get('/add', subscriptionController.getAddSubscription);

// GET /subscriptions/dashboard (to display the food-dashboard.ejs template)
router.get('/dashboard', subscriptionController.getSubscriptionDashboard);

// POST /subscriptions (to add a new food item)
router.post('/add', subscriptionController.addSubscriptionItem);



// GET /subscriptions/:subscriptionId/edit (to render the edit food item page)
router.get('/:subscriptionId/edit', subscriptionController.getEditSubscriptionItem);


// PUT /subscriptions/:subscriptionId (to edit an existing food item)
router.post('/:subscriptionId/edit', subscriptionController.updateSubscriptionItem);


// DELETE /subscriptions/:subscriptionId (to delete an existing food item)
router.post('/:subscriptionId/delete', subscriptionController.deleteSubscriptionItem);



module.exports = router;
