const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');



 // GET /addition/dashboard
 router.get('/dashboard', paymentController.getPaymentDashboard);

 // Route to render the invoice template
router.get('/:id/invoice', paymentController.getInvoice);

// route to render the payment due template
router.get('/payment-due', paymentController.getPaymentDue);

// Route to render confirmpayment
router.get('/:childId/confirm-payment', paymentController.renderConfirmPayment);

// Route to render View payment
router.get('/:childId/view-payments', paymentController.renderViewPayments);

//Route to post conirmpayment
router.post('/:childId/confirm-payment', paymentController.confirmPayment);

 module.exports = router;