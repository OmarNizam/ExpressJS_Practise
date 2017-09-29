const express = require('express'); // require the app

const app = express(); // create the app

app.get('/', (req, res) => {
   res.send('Hello Omar!!');
});

app.listen(3000); // app will be listening to port 3000
