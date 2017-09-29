const express = require('express'); // require the app

const app = express(); // create the app

app.set('view engine', 'pug'); // Tell Express which template engine to use

app.get('/', (req, res) => {
   res.render('index');
});

app.get('/cards', (req, res) => {
   res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think abut whose tomb it is. "});                   // prompt is variable name.
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
}); // app will be listening to port 3000
