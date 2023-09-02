const Child = require('../models/child');


exports.getPaymentDashboard =  async (req, res) => {
    try {
      // Fetch all children from the database
      const children = await Child.find().exec();
  
      // Render the student dashboard view with child data
      res.render('Payments/payment-dashboard', { children });
    } catch (error) {
      console.error('Error fetching children:', error);
      res.status(500).json({ error: 'An error occurred while fetching children.' });
    }
  };
  
// controllers/childController.js

const Food = require('../models/food');
const AdditionalService = require('../models/service');
const Subscription = require('../models/subscription');
// controllers/childController.js


// Function to calculate the total amount for the invoice
async function calculateTotal(child) {

  let foodTotal = 0;
  let additionalServicesTotal = 0;
  let subscriptionsTotal = 0;

  // Get the last paid date for the child
  const lastPaidDate = child.lastPaidDate;
  // console.log(lastPaidDate);
  // Calculate food total and filter consumedFood with price
  const filteredConsumedFood = child.consumedFood.filter((consumption) => consumption.date >= lastPaidDate);
  for (const consumption of filteredConsumedFood) {
    const food = await Food.findOne({ name: consumption.meal });
    if (food) {
      // console.log(food.date);
      foodTotal += food.price;
      consumption.price = food.price; // Add price property to consumption object
    }
  }

  curdate = new Date();
  // Calculate additional services total and filter additionalService with price
  const filteredAdditionalService = child.additionalService.filter((serv) => serv.date >= lastPaidDate);
  for (const serv of filteredAdditionalService) {
    const additionalService = await AdditionalService.findOne({ name: serv.service });
    if (additionalService) {
      
      prevdate = lastPaidDate;
      
   
        
        price = 0;
        prevday= await prevdate.getDate();
        curday = await curdate.getDate();
        prevmonth = await prevdate.getMonth();
        curmonth = await curdate.getMonth();
        usedday = 0;
        if (curmonth == prevmonth) {
          usedday = curday - prevday;
          
        } else if (curmonth == prevmonth + 1) {
          left = 30-prevday;
          usedday = left + curday+1;



        }else if ( curmonth > prevmonth+1) {
          left = 30-prevday;
          usedday = left + curday + ((curmonth-prevmonth - 1) * 30)+1;

        }
        if (usedday>= 60) {
          usedmonth = usedday//30;
          price = usedmonth * additionalService.price;
        } else if (usedday >= 30) {
          price = additionalService.price;
        }

      additionalServicesTotal += price;
      serv.price = price; // Add price property to additionalService object
    }
  }

  // Calculate subscriptions total and filter subscriptionType with price
  const filteredSubscriptionType = child.additionalSubscription.filter((subs) => subs.date >= lastPaidDate);
  for (const subs of filteredSubscriptionType) {
    const sub = await Subscription.findOne({ name: subs.subscription });
    if (sub) {
      subscriptionsTotal += sub.price;
      subs.price = sub.price; // Add price property to subscriptionType object
    }
  }
  
  // Monthly or Weekly subscription
  const getSubscriptionPrice = async (subscriptionName) => {
    try {

      prevdate = new Date(child.lastPaidDate);
      curdate = new Date();
      const subscription = await Subscription.findOne({ name: subscriptionName });
      if (subscription.name == "Monthly-Above" || subscription.name == "Monthly-Below") {
        
        price = 0;
        prevday= await prevdate.getDate();
        curday = await curdate.getDate();
        prevmonth = await prevdate.getMonth();
        curmonth = await curdate.getMonth();
        usedday = 0;
        if (curmonth == prevmonth) {
          usedday = curday - prevday;
          
        } else if (curmonth == prevmonth + 1) {
          left = 30-prevday;
          usedday = left + curday+1;



        }else if ( curmonth > prevmonth+1) {
          left = 30-prevday;
          usedday = left + curday + ((curmonth-prevmonth - 1) * 30)+1;

        }
        if (usedday>= 60) {
          usedmonth = usedday//30;
          price = usedmonth * subscription.price;
        } else if (usedday >= 30) {
          price = subscription.price;
        }
        console.log(usedday, price);
        return price;
      } else if (subscription.name == "Weekly") {

        price = 0;
        prevday= await prevdate.getDate();
        curday = await curdate.getDate();
        prevmonth = await prevdate.getMonth();
        curmonth = await curdate.getMonth();
        usedday = 0;

        if (curmonth == prevmonth) {
          usedday = curday - prevday+1;
          
        } else if (curmonth == prevmonth + 1) {
          left = 30-prevday+1;
          usedday = left + curday;



        }else if ( curmonth > prevmonth+1) {
          left = 30-prevday;
          usedday = left + curday + ((curmonth-prevmonth - 1) * 30)+1;

        }
        price = usedday * subscription.price;
        return price;
        
      }
      return 0; // Default value if subscription is not found
    } catch (error) {
      console.error('Error fetching subscription price:', error);
      throw error; // Handle the error accordingly
    }
  };
  
  // Example usage
  const subscriptionName = child.subscriptionType;
  var cost = 0;
  
  if (subscriptionName && subscriptionName != "None") {
     cost += await getSubscriptionPrice(subscriptionName);
  }
  // Replace with the subscription name you want to find
  

  // Calculate the total amount by adding up all the individual totals.
  const totalAmount = foodTotal + additionalServicesTotal + subscriptionsTotal + cost;
  return { totalAmount, filteredConsumedFood,cost, filteredAdditionalService, filteredSubscriptionType };
}


// Controller function to render the invoice EJS template
exports.getInvoice = async (req, res) => {
  try {
    const childId = req.params.id;

  // Fetch the child data
  

    const child = await Child.findById(childId);

    // Calculate the total amount and get the filtered arrays
    const { totalAmount, filteredConsumedFood, cost, filteredAdditionalService, filteredSubscriptionType } = await calculateTotal(child);

    // Render the invoice EJS template with the required data.
    res.render('Payments/invoices', {
      child,
      totalAmount,
      cost,
      filteredConsumedFood,
      filteredAdditionalService,
      filteredSubscriptionType,
    });
  } catch (error) {
    console.error('Error fetching data for invoice:', error);
    // Handle the error and render an error page or redirect to an error route.
    res.status(500).send('Error fetching data for invoice.');
  }
};


exports.renderConfirmPayment = async (req, res) => {
  try {
    const child = await Child.findById(req.params.childId);
    if (!child) {
      return res.status(404).send('Child not found.');
    }
    res.render('Payments/confirm-payment', { child });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.renderViewPayments = async (req, res) => {
  try {
    const child = await Child.findById(req.params.childId);
    if (!child) {
      return res.status(404).send('Child not found.');
    }
    res.render('Payments/view-payments', { child });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


exports.confirmPayment = async (req, res) => {
  try {
    const { paymentDate, paymentTime, amount, paymentDescription} = req.body;
    const child = await Child.findById(req.params.childId);
    if (!child) {
      return res.status(404).send('Child not found.');
    }

    // Update the child's lastPaidDate with the new payment date
    const fullDateTimeString = `${paymentDate}T${paymentTime}:00.000Z`;
    const dateTime = new Date(fullDateTimeString);
    child.lastPaidDate = new Date(dateTime);
    child.payments.push({paymentDate, amount, paymentDescription});
    child.overdue = false;
    child.additionalService.forEach((serv) => {
      serv.date = new Date(dateTime);
    })

    await child.save();

    res.redirect('/payments/dashboard'); // Redirect to the child dashboard or any other page after confirming payment
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


// controllers/paymentController.js

exports.getPaymentDue = async (req, res) => {
  try {
    // Find all children with monthly and weekly subscriptions
const children = await Child.find({
  subscriptionType: { $in: ['Monthly-Below', 'Monthly-Above', 'Weekly'] },
});

    // console.log(children);
    // Filter children whose payment is due
    const curdate = new Date();
    curday =  curdate.getDate();
    curmonth = curdate.getMonth();

    const dueChildren = await children.filter((child) => {
        prevday= child.lastPaidDate.getDate();
        prevmonth = child.lastPaidDate.getMonth();

        usedday = 0;
        if (curmonth == prevmonth) {
          usedday = curday - prevday;
          
        } else if (curmonth == prevmonth + 1) {
          left = 30-prevday;
          usedday = left + curday+1;



        }else if ( curmonth > prevmonth+1) {
          left = 30-prevday;
          usedday = left + curday + ((curmonth-prevmonth - 1) * 30)+1;

        }



      if ( child.subscriptionType == 'Monthly-Below' || child.subscriptionType == 'Monthly-Above') {

        if (usedday >30) {
          child.overdue = true;
        }
        return usedday >= 25;

      } else if (child.subscriptionType == 'Weekly') {
        if (usedday >7) {
          child.overdue = true;
        }
      
      return usedday >=5;
    }
  });


    // Render the payment due page with the list of due children
    res.render('Payments/payment-due', { dueChildren });
  } catch (error) {
    console.error('Error fetching payment due data:', error);
    // Handle the error and render an error page or redirect to an error route.
    res.status(500).send('Error fetching payment due data.');
  }
};
