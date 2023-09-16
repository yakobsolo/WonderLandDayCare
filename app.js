const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const childrenRouter = require('./routes/children');
const foodRouter = require('./routes/food');
const serviceRouter = require('./routes/service');
const subscriptionRouter = require('./routes/subscription');
const additionRouter = require('./routes/addition');
const paymentRouter = require('./routes/payment');
const expenseRouter = require('./routes/expense');
const reportRouter = require('./routes/report');
const loginRouter = require('./routes/login');

const db_password = "jaxNWXbfMFYhZJWQ";
const dbUrl = "mongodb+srv://wonderland:jaxNWXbfMFYhZJWQ@cluster0.u2ctjw1.mongodb.net/?retryWrites=true&w=majority"

const app = express();
const PORT = process.env.PORT || 3000;

// Set the views directory to the 'views' folder in the current directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
// mongodb://127.0.0.1:27017/daycare
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/children', childrenRouter);
app.use('/services', serviceRouter);
app.use('/foods', foodRouter); // Add the food tracker route
app.use('/subscriptions', subscriptionRouter);
app.use('/additions', additionRouter); // Add the food tracker route
app.use('/payments', paymentRouter);
app.use('/expenses', expenseRouter);
app.use('/reports', reportRouter);

app.use('/login', loginRouter);


app.get('/', (req, res) => {
  res.render('index');
});



