const express = require('express'); // require the app

const app = express(); // create the app
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());  // call the func directly and provide it in to the app

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
];

app.set('view engine', 'pug'); // Tell Express which template engine to use

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
  const name = req.cooikies.username;
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

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
}); // app will be listening to port 3000
