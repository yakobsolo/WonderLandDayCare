const express = require('express');
const router = express.Router();
const additionController = require('../controllers/additionController');



 // GET /addition/dashboard
 router.get('/dashboard', additionController.getChildDashboard);

 // GET /addition/:childId/consume
 router.get('/:childId/consume', additionController.getConsumedFood)
 
 // POST /addition/:childId/consume
 router.post('/:childId/consume', additionController.consumeFood);

 // GET /addition/:childId/service
 router.get('/:childId/service', additionController.getAddService);
 
 // POST /addition/:childId/service
 router.post('/:childId/service', additionController.addService);



 // GET /addition/:childId/subscription
//  router.get('/:childId/subscribe', additionController.getAddSubscription);
 

 // POST /addition/:childId/subscription
//  router.post('/:childId/subscribe', additionController.addSubscription);

 // GET /addition/:childId/additonalsubscription
 router.get('/:childId/additionalsubscribe', additionController.getAddAdditionalSubscription);
 

 // POST /addition/:childId/additionalsubscription
 router.post('/:childId/additionalsubscribe', additionController.addAdditionalSubscription);


 module.exports = router;
