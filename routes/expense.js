const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');






// GET /expenses/add (to display the add-expense.ejs template)
router.get('/add', expenseController.getAddExpense);

// GET /expenses/dashboard (to display the expense-dashboard.ejs template)
router.get('/dashboard', expenseController.getExpenseDashboard);

// POST /expenses (to add a new food item)
router.post('/add', expenseController.addExpenseItem);

// GET /expenses/:expenseId/edit (to render the edit food item page)
router.get('/:expenseId/edit', expenseController.getEditExpenseItem);


// PUT /expenses/:expenseId (to edit an existing food item)
router.post('/:expenseId/edit', expenseController.updateExpenseItem);

// DELETE /expenses/:expenseId (to delete an existing food item)
router.post('/:expenseId/delete', expenseController.deleteExpenseItem);


module.exports = router;