const Child = require('../models/child');
const subscription = require('../models/subscription');
const Food = require('../models/food');
const service = require('../models/service');


exports.getChildDashboard =  async (req, res) => {
    try {
      // Fetch all children from the database
      
      const children = await Child.find().exec();
  
      // Render the student dashboard view with child data
      res.render('Additions/addition-dashboard', { children });
    } catch (error) {
      console.error('Error fetching children:', error);
      res.status(500).json({ error: 'An error occurred while fetching children.' });
    }
  };
  

// Display the form to consume food for a specific child
exports.getConsumedFood = async (req, res) => {
    try {
      const { childId } = req.params;
      const child = await Child.findById(childId);
      const foods = await Food.find();

      if (!child) {
        return res.status(404).render('error', { message: 'Child not found' });
      }
      res.render('Foods/food-tracker', { childId, foods });
    } catch (err) {
      console.error('Error fetching child:', err);
      res.status(500).render('error', { message: 'Internal Server Error' });
    }
  };
  
  exports.consumeFood = async (req, res) => {
    try {
      const { childId } = req.params;
      const { date, food, time } = req.body;
  
      // Find the child by its ID
      const child = await Child.findById(childId);
  
      // Add the consumed food to the child's record
      const fullDateTimeString = `${date}T${time}:00.000Z`;
      const dateTime = new Date(fullDateTimeString);

      child.consumedFood.push({ date: dateTime, meal: food });
  
      // Save the updated child record
      await child.save();
  
      res.redirect('/additions/dashboard'); // Redirect to the additions dashboard after successful update
    } catch (error) {
      console.error('Error consuming food:', error);
      res.status(500).json({ error: 'An error occurred while consuming food.' });
    }
  };
  
  // Display the form to consume SErvice for a specific child
exports.getAddService = async (req, res) => {
    try {
      const { childId } = req.params;
      const child = await Child.findById(childId);
      const services = await service.find().exec();
      if (!child) {
        return res.status(404).render('error', { message: 'Child not found' });
      }
      res.render('Services/service-tracker', { childId , services});
    } catch (err) {
      console.error('Error fetching child:', err);
      res.status(500).render('error', { message: 'Internal Server Error' });
    }
  };
  
  exports.addService = async (req, res) => {
    try {
      const { childId } = req.params;
      const { date, time, service } = req.body;
  
      // Find the child by its ID
      const child = await Child.findById(childId);
      const fullDateTimeString = `${date}T${time}:00.000Z`;
      const dateTime = new Date(fullDateTimeString);
      // Add the consumed food to the child's record
      child.additionalService.push({ date: dateTime, service });
  
      // Save the updated child record
      await child.save();
  
      res.redirect('/additions/dashboard'); // Redirect to the additions dashboard after successful update
    } catch (error) {
      console.error('Error adding service:', error);
      res.status(500).json({ error: 'An error occurred while adding food.' });
    }
  };
  
  // Display the form to add subscription for a specific child
// exports.getAddSubscription = async (req, res) => {
//     try {
//       const { childId } = req.params;
//       const child = await Child.findById(childId);
//       const subscriptions = await subscription.find().exec();
//       if (!child) {
//         return res.status(404).render('error', { message: 'Child not found' });
//       }
//       if (!subscriptions) {
//         return res.status(404).render('error', { message: 'Subscirption not found' });
//       }
//       res.render('Subscriptions/subscription-tracker', { childId, subscriptions });
//     } catch (err) {
//       console.error('Error fetching child:', err);
//       res.status(500).render('error', { message: 'Internal Server Error' });
//     }
//   };
  
//   exports.addSubscription = async (req, res) => {
//     try {
//       const { childId } = req.params;
//       const { date, time, subscription } = req.body;
  
//       // Find the child by its ID
//       const child = await Child.findById(childId);
//       const fullDateTimeString = `${date}T${time}:00.000Z`;
//       const dateTime = new Date(fullDateTimeString);
//       // Add the consumed food to the child's record
//       child.subscriptionType.push({ date: dateTime, subscription });
      
//       // Save the updated child record
//       await child.save();
  
//       res.redirect('/additions/dashboard'); // Redirect to the additions dashboard after successful update
//     } catch (error) {
//       console.error('Error adding subscription:', error);
//       res.status(500).json({ error: 'An error occurred while adding subscription.' });
//     }
//   };


  // Display the form to add  additional subscription for a specific child
exports.getAddAdditionalSubscription = async (req, res) => {
  try {
    const { childId } = req.params;
    const subscriptions = await subscription.find().exec();

    const child = await Child.findById(childId);
    if (!child) {
      return res.status(404).render('error', { message: 'Child not found' });
    }
    if (!subscription) {
      return res.status(404).render('error', { message: 'Subscirption not found' });
    }
    res.render('Subscriptions/additional-subscription-tracker', { childId, subscriptions });
  } catch (err) {
    console.error('Error fetching child:', err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

exports.addAdditionalSubscription = async (req, res) => {
  try {
    const { childId } = req.params;
    const { date, time, subscription } = req.body;

    // Find the child by its ID
    const child = await Child.findById(childId);

    const fullDateTimeString = `${date}T${time}:00.000Z`;
    const dateTime = new Date(fullDateTimeString);
    // Add the consumed food to the child's record
    child.additoinalSubscription.push({ date: dateTime, subscription });
    
    // Save the updated child record
    await child.save();

    res.redirect('/additions/dashboard'); // Redirect to the additions dashboard after successful update
  } catch (error) {
    console.error('Error adding additional subscription:', error);
    res.status(500).json({ error: 'An error occurred while adding additonal subscription.' });
  }
};
  
  