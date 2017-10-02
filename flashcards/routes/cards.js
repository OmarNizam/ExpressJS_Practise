const express = require("express");
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {   // we deleted the cards from the bath here because we declared it in the app.js
  const { side } = req.query;
  const { id } = req.params;

  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { text, hint }
  
  res.render('card', templateData); // prompt is variable name.
});

module.exports = router;
