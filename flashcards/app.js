const express = require('express'); // require the app

const app = express(); // create the app
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // to post the incoming form data
app.use(cookieParser());  // call the func directly and provide it in to the app // to read cookie information

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
];

app.set('view engine', 'pug'); // Tell Express which template engine to use

// To run middleware function in response to requests, pass it into app.use
app.use((req, res, next) => {
  // console.log('One');
  req.message = "This message made it!"; // how to pass message from function to another
  next();
});

app.use((req, res, next) => {
  // console.log('Two');
  console.log(req.message);
  next();
});






app.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name }); // redirect user to welcome page if the cookies username has value
  } else {
    res.redirect('hello');  // redirect user to hello page if the cookies username isn't set
  }
});



app.get('/cards', (req, res) => {
  res.render('card', {
    prompt: "Who is buried in Grant's tomb?",
    hint: "Think abut whose tomb it is.",
    colors        // post the array in to the template
  }); // prompt is variable name.
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});
app.post('/hello', (req, res) => {
  // console.dir(req.body); // to look closely on the request body
  //res.json(req.body); // if we want to see the json file of the req.body
  res.cookie('username', req.body.username); // this will send a cookie to the browser after the user submit the form
  // res.render('hello', { name: req.body.username });
  res.redirect('/');
});

// post request for the goodbye button
// Create a new route called goodbye
app.post('/goodbye', (req, res) => {
  res.clearCookie('username'); // clear the cookie then redirect to the hello page
  res.redirect('/hello');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
}); // app will be listening to port 3000
