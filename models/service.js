// models/AdditionalService.js

const mongoose = require('mongoose');

const additionalServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('AdditionalService', additionalServiceSchema);
