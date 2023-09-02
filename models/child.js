const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  date: Date,
  meal: String,
  // Add other food-related fields as needed
});
const paymentSchema = new mongoose.Schema({
  paymentDate: Date,
  paymentDescription: String,
  amount: String,
  // Add other food-related fields as needed
});

const subscriptionSchema = new mongoose.Schema({


  date: Date,
  subscription: String,
  // Add other food-related fields as needed
});

const serviceSchema = new mongoose.Schema({
  date: Date,
  service: String,
  // Add other food-related fields as needed
});
const childSchema = new mongoose.Schema({
  name: String,
  parentName: String,
  grandParentName: String,
  age: Number,
  sex: String,
  month: Number,
  weight: Number,
  height: Number,
  maincontact: Number,
  fatherFullName: String,
  faddress: String,
  fsubcity: String,
  fworeda: String,
  fhouseno: String,
  fphoneno: Number,
  motherFullName: String,
  maddress: String,
  msubcity: String,
  mworeda: String,
  mhouseno: String,
  mphoneno: Number,
  thirdPersonFullName: String,
  tpaddress: String,
  tpsubcity: String,
  tpworeda: String,
  tphouseno: String,
  tpphoneno: Number,
  medicalInformation: String,

  subscriptionType: String,
  lastPaidDate: Date,
  
  
  consumedFood: [foodSchema], // Track the consumed food as an array of food objects
  additionalService: [serviceSchema],
  additionalSubscription: [subscriptionSchema],
  payments: [paymentSchema],
  overdue: {
    type: Boolean,
    default:  false,
  },


  status: {
    type: Boolean,
    default: true, // Default to "in process"
  },


  // Add other fields as needed

});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;
