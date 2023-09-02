// models/expensesModel.js

const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  expensedate: { 
    type: Date,
    required: true
 },
  description: { 
    type: String, 
    required: true 
},
  amount: { 
    type: Number,
    required: true 
},
});

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;
