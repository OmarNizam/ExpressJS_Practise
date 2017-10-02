const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {   // we deleted the cards from the bath here because we declared it in the app.js
  res.render('card', { prompt: "Who is buried in Grant's tomb?" }); // prompt is variable name.
});

module.exports = router;
