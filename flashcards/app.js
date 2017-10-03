const express = require('express'); // require the app

const app = express(); // create the app
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // to post the incoming form data
app.use(cookieParser());  // call the func directly and provide it in to the app // to read cookie information
app.use('/static', express.static('public'));
// const colors = [
//   'red',
//   'orange',
//   'yellow',
//   'green',
//   'blue',
//   'purple'
// ];

app.set('view engine', 'pug'); // Tell Express which template engine to use

// import the router to let the app to access to the routes
const mainRoutes = require('./routes/index');
// import the card routes for the falshcards
const cardRoutes = require('./routes/cards');
// use routes variable and declared to make middleware now
app.use(mainRoutes);
app.use('/cards', cardRoutes);  // '/cards' here means that all the routes in cards.js are cards


// To run middleware function in response to requests, pass it into app.use

// app.use((req, res, next) => {
//   // console.log('One');
//   // req.message = "This message made it!"; // how to pass message from function to another
//   console.log("Hello");
//   const err = new Error('Oh noes!');
//   err.status = 500; // set the error status to 500 the general server Error
//   next(err);
// });

//second middleware

// app.use((req, res, next) => {
//   // console.log('Two');
//   // console.log(req.message);
//   console.log("World");
//   next();
// });


// create an error if the route not found 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error middleware OR error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status); // will be 500
  res.render('error', err); // we added err object cause it hold data about error and this will give the template access to error data
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
}); // app will be listening to port 3000
