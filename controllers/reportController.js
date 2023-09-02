// get reportdashboard
exports.getReportDashboard = (req, res) => {
    res.render('Reports/report-dashboard');
}


// const Food = require('../models/food');
// const AdditionalService = require('../models/service');
// const Subscription = require('../models/subscription');
const expense = require('../models/expense');
const Child = require('../models/child');

// function to calculate the total expense for the report
async function calculateExpenseTotal(startDate, endDate) {
    
    expenseTotal = 0
    try {
        const expenses = await expense.find({});
        // Process the expenses array
        expenses.forEach((exp) => {
            if (exp.expensedate >= startDate && exp.expensedate <= endDate) {
            expenseTotal += exp.amount;
        }
        });
        return expenseTotal;
      } catch (err) {
        console.error('Error retrieving expenses:', err);
      }
      l
}

// Function to calculate the total amount for the report
async function calculateChildTotal(child, startDate, endDate) {
  childTotal = 0
  try{

    // console.log(child);

  // filteredpayment = child.payments.filter((payment) => payment.paymentDate >= startDate && payment.paymentDate <= endDate )
  child.payments.forEach(childpayment => {
    childTotal += parseInt(childpayment.amount);
    
  });
}catch(e) {
  console.error('Error fetching data for child:', e);
  // Handle the error and render an error page or redirect to an error route.
  res.status(500).send('Error fetching data for child.');
}

  
 
//   let foodTotal = 0;
//   let additionalServicesTotal = 0;
//   let subscriptionsTotal = 0;

//   // Get the last paid date for the child
//   const lastPaidDate = child.lastPaidDate;
//   var filteredConsumedFood = [];
//   // Calculate food total and filter consumedFood with price
//   if (lastPaidDate >= startDate && lastPaidDate<= endDate) {
//     filteredConsumedFood = child.consumedFood.filter((consumption) => consumption.date >= startDate && consumption.date <= lastPaidDate);

//   }
//   else if (lastPaidDate > endDate) {
//     filteredConsumedFood = child.consumedFood.filter((consumption) => consumption.date >= startDate && consumption.date <= endDate);

//   }

//   if (filteredConsumedFood.length > 0){
//   for (const consumption of filteredConsumedFood) {
//     const food = await Food.findOne({ name: consumption.meal });
//     if (food) {
//       foodTotal += food.price;
//       consumption.price = food.price; // Add price property to consumption object
//     }
//   }
// }
//   var filteredAdditionalService = [];
//   // Calculate food total and filter consumedFood with price
//   if (lastPaidDate >= startDate && lastPaidDate<= endDate) {
//     filteredAdditionalService = child.additionalService.filter((serv) => serv.date >= startDate && serv.date <= lastPaidDate);

//   }
//   else if (lastPaidDate > endDate) {
//     filteredAdditionalService = child.additionalService.filter((serv) => serv.date >= startDate && serv.date <= endDate);

//   }
//   if (filteredAdditionalService.length > 0) {
//   for (const serv of filteredAdditionalService) {
//     const additionalService = await AdditionalService.findOne({ name: serv.service });
//     if (additionalService) {
//       additionalServicesTotal += additionalService.price;
//       serv.price = additionalService.price; // Add price property to additionalService object
//     }
//   }
//   }

//   var filteredSubscriptionType = [];
//   // Calculate food total and filter consumedFood with price
//   if (lastPaidDate >= startDate && lastPaidDate<= endDate) {
//     filteredSubscriptionType = child.subscriptionType.filter((subs) => subs.date >= startDate && subs.date <= lastPaidDate);

//   }
//   else if (lastPaidDate > endDate) {
//     filteredSubscriptionType = child.subscriptionType.filter((subs) => subs.date >= startDate && subs.date <= endDate);

//   }
//   // Calculate subscriptions total and filter subscriptionType with price
//   if (filteredSubscriptionType.length > 0) {
//   for (const subs of filteredSubscriptionType) {
//     const sub = await Subscription.findOne({ name: subs.subscription });
//     if (sub) {
//       subscriptionsTotal += sub.price;
//       subs.price = sub.price; // Add price property to subscriptionType object
//     }
//   }
//   }
//   // Calculate the total amount by adding up all the individual totals.
//   const totalAmount = foodTotal + additionalServicesTotal + subscriptionsTotal;

//   console.log(totalAmount);
  

  return childTotal
};



// Controller function to render the reportview EJS template
exports.getReport = async (req, res) => {
    try {
        const startDateStr = req.body.startDate; // Assuming the date is passed as a string in the format 'YYYY-MM-DD'
        const endDateStr = req.body.endDate;

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        childTotal = 0
        // Fetch the child data
        
        const children = await Child.find({});
        // Process the expenses array
        
        for (child of children) {
            childTotal += await calculateChildTotal(child, startDate, endDate);
            
        // calculate expense total 
    };
        const expenseTotal = await calculateExpenseTotal(startDate, endDate);
        const netProfit = childTotal - expenseTotal;
        
        // Render the invoice EJS template with the required data.
        res.render('Reports/get-report', {
        startDate,
        endDate,
        childTotal,
        expenseTotal,
        netProfit,
  
});
        // Perform other operations with each expense
    
      
      
     

     
    } catch (error) {
      console.error('Error fetching data for child:', error);
      // Handle the error and render an error page or redirect to an error route.
      res.status(500).send('Error fetching data for child.');
    }
  };

