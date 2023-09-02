const Expense = require('../models/expense');
// const Child = require('../models/child');

exports.getAddExpense = (req, res) => {
  res.render('Expenses/add-expense');
};

exports.getExpenseDashboard = async (req, res) => {
  try {
    const expenseItems = await Expense.find();
    res.render('Expenses/expense-dashboard', { expenseItems});
  } catch (error) {
    console.error('Error fetching expense items:', error);
    res.status(500).json({ error: 'An error occurred while fetching expense items.' });
  }
};

// ... (rest of the foodController functions)



exports.addExpenseItem = async (req, res) => {
  try {
    const { expensedate, description, amount } = req.body;
    const newExpenseItem = new Expense({ expensedate, description, amount });
    await newExpenseItem.save();
    res.redirect('/expenses/dashboard')
  } catch (error) {
    console.error('Error adding expense item:', error);
    res.status(500).json({ error: 'An error occurred while adding the expense item.' });
  }
};



exports.getEditExpenseItem = async (req, res) => {
  try {
    const { expenseId } = req.params;
    // Fetch the food item by ID from the database
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).send('Expense item not found.');
    }
    // Render the edit.ejs template and pass the food data as an object
    res.render('Expenses/edit-expense', { expense });
  } catch (error) {
    console.error('Error fetching expense item:', error);
    res.status(500).send('An error occurred while fetching the expense item.');
  }
};


exports.updateExpenseItem = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const updatedExpenseData = req.body;
    // Update the food item in the database
    await Expense.findByIdAndUpdate(expenseId, updatedExpenseData, { new: true });
    res.redirect('/expenses/dashboard'); // Redirect to the expense dashboard after successful update
  } catch (error) {
    console.error('Error updating expense item:', error);
    res.status(500).json({ error: 'An error occurred while updating the expense item.' });
  }
};


exports.deleteExpenseItem = async (req, res) => {
  try {
    const { expenseId } = req.params;
    // Delete the food item from the database
    await Expense.findByIdAndDelete(expenseId);
    res.redirect('/expenses/dashboard')
  } catch (error) {
    console.error('Error deleting expense item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the expense item.' });
  }
};