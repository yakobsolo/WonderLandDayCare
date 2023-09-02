const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    price: {
        type: Number,
        required: true,
      },
  // Add other fields as needed
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
