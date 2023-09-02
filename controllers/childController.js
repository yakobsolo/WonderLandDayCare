const Child = require('../models/child');
const subscription = require('../models/subscription');
const additionalService = require('../models/service');

exports.getregisterChild = async (req, res) => {
  try {
    // Fetch all children from the database
    const subscriptions = await subscription.find().exec();
    const services = await additionalService.find();
    // Render the register view with subscription data
    res.render('Children/register', { subscriptions, services });
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({ error: 'An error occurred while fetching subscriptions.' });
  }
};


// change status
exports.changeStatus = async (req, res) => {
  try {
    const { childId } = req.params;


    const child = await Child.findById(childId);
    if (child.status == true) {
      child.status = false;
    } else {
      child.status = true;
    }
    // 

    child.save()
    res.redirect('/children/dashboard')
  } catch (error) {
    console.error('Error change status:', error);
    res.status(500).json({ error: 'An error occurred while changing status.' });
  }
};


exports.registerChild = async (req, res) => {
  try {
    const { name, parentName, grandParentName, sex, age, month, weight, height, maincontact, fatherFullName, faddress, fsubcity, fworeda, fhouseno, fphoneno, motherFullName, maddress, msubcity, mworeda, mhouseno, mphoneno, thirdPersonFullName, tpaddress, tpsubcity, tpworeda, tphouseno, tpphoneno, subscription, lastPaidDate, lastPaidTime, service } = req.body;



    // Create a new child record
    const newChild = new Child({
      name,
      parentName,
      grandParentName,
      sex,
      age,
      month,
      weight,
      height,
      maincontact,
      fatherFullName,
      faddress,
      fsubcity,
      fworeda,
      fhouseno,
      fphoneno,
      motherFullName,
      maddress,
      msubcity,
      mworeda,
      mhouseno, 
      mphoneno,
      thirdPersonFullName,
      tpaddress,
      tpsubcity,
      tpworeda,
      tphouseno,
      tpphoneno,
      
    });

    if (subscription && subscription !== "None") {
      newChild.subscriptionType = subscription;
    }


    if (service && service !== "None") {
      newChild.additionalService.push({ date: lastPaidDate, service });
    }
    const fullDateTimeString = `${lastPaidDate}T${lastPaidTime}:00.000Z`;
    const dateTime = new Date(fullDateTimeString);

    newChild.lastPaidDate = dateTime;

    // Save the child record to the database
    await newChild.save();
    res.redirect('/children/dashboard')
  } catch (error) {
    console.error('Error registering child:', error);
    res.status(500).json({ error: 'An error occurred while registering the child.' });
  }
};


// view child
exports.getViewChild = async (req, res) => {
  try {
    const { childId } = req.params;
    // Fetch all children from the database
    const child = await Child.findById(childId);

    // Render the student dashboard view with child data
    res.render('Children/child-view', { child });
  } catch (error) {
    console.error('Error fetching child:', error);
    res.status(500).json({ error: 'An error occurred while fetching chid.' });
  }
};

exports.getChildDashboard = async (req, res) => {
  try {
    // Fetch all children from the database
    const children = await Child.find().exec();

    // Render the student dashboard view with child data
    res.render('Children/children-dashboard', { children });
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({ error: 'An error occurred while fetching children.' });
  }
};

exports.getEditChild = async (req, res) => {
  try {
    const { childId } = req.params;
    // Fetch the child by its ID from the database
    const child = await Child.findById(childId);
    const subscriptions = await subscription.find().exec();

    if (!child) {
      return res.status(404).send('Child not found.');
    }
    res.render('Children/edit-child', { child, subscriptions });
  } catch (error) {
    console.error('Error fetching child:', error);
    res.status(500).send('An error occurred while fetching the child.');
  }
};

exports.updateChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const updatedChildData = req.body;
    // Update the child in the database
    await Child.findByIdAndUpdate(childId, updatedChildData, { new: true });
    res.redirect('/children/dashboard'); // Redirect to the child dashboard after successful update
  } catch (error) {
    console.error('Error updating child:', error);
    res.status(500).json({ error: 'An error occurred while updating the child.' });
  }
};

exports.deleteChild = async (req, res) => {
  try {
    const { childId } = req.params;
    // Delete the child from the database
    await Child.findByIdAndDelete(childId);
    res.redirect('/children/dashboard'); // Redirect to the child dashboard after successful delete
  } catch (error) {
    console.error('Error deleting child:', error);
    res.status(500).json({ error: 'An error occurred while deleting the child.' });
  }
};

