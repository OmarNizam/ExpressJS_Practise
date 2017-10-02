const express = require("express");
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {   // we deleted the cards from the bath here because we declared it in the app.js
  res.render('card', {
    prompt: cards[req.params.id].question,
    hint: cards[req.params.id].hint
  }); // prompt is variable name.
});

module.exports = router;
