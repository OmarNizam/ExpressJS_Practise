const express = require("express");
const router = express.Router(); // Create a new router in express and you can add routes and middlewares to it.

router.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name }); // redirect user to welcome page if the cookies username has value
  } else {
    res.redirect('hello');  // redirect user to hello page if the cookies username isn't set
  }
});


router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});
router.post('/hello', (req, res) => {
  // console.dir(req.body); // to look closely on the request body
  //res.json(req.body); // if we want to see the json file of the req.body
  res.cookie('username', req.body.username); // this will send a cookie to the browser after the user submit the form
  // res.render('hello', { name: req.body.username });
  res.redirect('/');
});

// post request for the goodbye button
// Create a new route called goodbye
router.post('/goodbye', (req, res) => {
  res.clearCookie('username'); // clear the cookie then redirect to the hello page
  res.redirect('/hello');
});


module.exports = router;
