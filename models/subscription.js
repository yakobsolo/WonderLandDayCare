// models/SubscriptionFee.js

const mongoose = require('mongoose');

const subscriptionFeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('SubscriptionFee', subscriptionFeeSchema);
