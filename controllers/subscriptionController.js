const Subscription = require('../models/subscription');

exports.getAddSubscription = (req, res) => {
  res.render('Subscriptions/add-subscription');
};

exports.getSubscriptionDashboard = async (req, res) => {
  try {
    const subscriptionItems = await Subscription.find();
    res.render('Subscriptions/subscription-dashboard', { subscriptionItems});
  } catch (error) {
    console.error('Error fetching Subscription items:', error);
    res.status(500).json({ error: 'An error occurred while fetching Subscription items.' });
  }
};

// ... (rest of the foodController functions)



exports.addSubscriptionItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newSubscriptionItem = new Subscription({ name, price });
    await newSubscriptionItem.save();
    res.redirect('/subscriptions/dashboard')
  } catch (error) {
    console.error('Error adding subscription item:', error);
    res.status(500).json({ error: 'An error occurred while adding the Subscription item.' });
  }
};



exports.getEditSubscriptionItem = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    // Fetch the food item by ID from the database
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).send('Subscription item not found.');
    }
    // Render the edit.ejs template and pass the food data as an object
    res.render('Subscriptions/edit-subscription', { subscription });
  } catch (error) {
    console.error('Error fetching subscription item:', error);
    res.status(500).send('An error occurred while fetching the subscribtion item.');
  }
};


exports.updateSubscriptionItem = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const updatedSubscriptionData = req.body;
    // Update the food item in the database
    await Subscription.findByIdAndUpdate(subscriptionId, updatedSubscriptionData , { new: true });
    res.redirect('/subscriptions/dashboard'); // Redirect to the subscription dashboard after successful update
  } catch (error) {
    console.error('Error updating subscription item:', error);
    res.status(500).json({ error: 'An error occurred while updating the subscription item.' });
  }
};


exports.deleteSubscriptionItem = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    // Delete the food item from the database
    await Subscription.findByIdAndDelete(subscriptionId);
    res.redirect('/subscriptions/dashboard')
  } catch (error) {
    console.error('Error deleting subscription item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the subscription item.' });
  }
};