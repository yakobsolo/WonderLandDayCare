const Service = require('../models/service');

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.render('Services/services-dashboard', { services });
  } catch (err) {
    console.error('Error fetching services:', err);
    res.render('error');
  }
};

// Render add service form
exports.renderAddService = (req, res) => {
  res.render('Services/add-services');
};

// Add a new service
exports.addService = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newService = new Service({ name, price });
    await newService.save();
    res.redirect('/services/dashboard');
  } catch (err) {
    console.error('Error adding service:', err);
    res.render('error');
  }
};

// Render edit service form
exports.renderEditService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.render('Services/edit-service', { service });
  } catch (err) {
    console.error('Error fetching service for editing:', err);
    res.render('error');
  }
};

// Edit existing service
exports.editService = async (req, res) => {
  try {
    const { name, price } = req.body;
    await Service.findByIdAndUpdate(req.params.id, { name, price });
    res.redirect('/services/dashboard');
  } catch (err) {
    console.error('Error editing service:', err);
    res.render('error');
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.redirect('/services/dashboard');
  } catch (err) {
    console.error('Error deleting service:', err);
    res.render('error');
  }
};
