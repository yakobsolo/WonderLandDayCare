const Food = require('../models/food');
const Child = require('../models/child');

exports.getAddFood = (req, res) => {
  res.render('Foods/add-food');
};

exports.getFoodDashboard = async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.render('Foods/food-dashboard', { foodItems});
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ error: 'An error occurred while fetching food items.' });
  }
};

// ... (rest of the foodController functions)



exports.addFoodItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newFoodItem = new Food({ name, price });
    await newFoodItem.save();
    res.redirect('/foods/dashboard')
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).json({ error: 'An error occurred while adding the food item.' });
  }
};



exports.getEditFoodItem = async (req, res) => {
  try {
    const { foodId } = req.params;
    // Fetch the food item by ID from the database
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send('Food item not found.');
    }
    // Render the edit.ejs template and pass the food data as an object
    // console.log("am here")
    res.render('Foods/edit-food', { food });
  } catch (error) {
    console.error('Error fetching food item:', error);
    res.status(500).send('An error occurred while fetching the food item.');
  }
};


exports.updateFoodItem = async (req, res) => {
  try {
    const { foodId } = req.params;
    const updatedFoodData = req.body;
    // Update the food item in the database
    await Food.findByIdAndUpdate(foodId, updatedFoodData, { new: true });
    res.redirect('/foods/dashboard'); // Redirect to the food dashboard after successful update
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).json({ error: 'An error occurred while updating the food item.' });
  }
};


exports.deleteFoodItem = async (req, res) => {
  try {
    const { foodId } = req.params;
    // Delete the food item from the database
    await Food.findByIdAndDelete(foodId);
    res.redirect('/foods/dashboard')
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the food item.' });
  }
};