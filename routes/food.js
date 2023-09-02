const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');






// GET /food/add (to display the add-food.ejs template)
router.get('/add', foodController.getAddFood);

// GET /food/dashboard (to display the food-dashboard.ejs template)
router.get('/dashboard', foodController.getFoodDashboard);

// POST /food (to add a new food item)
router.post('/add', foodController.addFoodItem);

// GET /food/:foodId/edit (to render the edit food item page)
router.get('/:foodId/edit', foodController.getEditFoodItem);


// PUT /food/:foodId (to edit an existing food item)
router.post('/:foodId/edit', foodController.updateFoodItem);

// DELETE /food/:foodId (to delete an existing food item)
router.post('/:foodId/delete', foodController.deleteFoodItem);


module.exports = router;
