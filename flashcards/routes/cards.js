const express = require("express");
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data; // = const cards = data.cards;

// Create a new route to randomize cards
router.get('/', (req, res) => {
  const numberOfCards = cards.length; // I need the total number of cards we have to choose from.
  const flashcardId = Math.floor( Math.random() * numberOfCards ); // randomize the cards
  // redirect to random card
  res.redirect(`/cards/${flashcardId}`);
});

router.get('/:id', (req, res) => {   // we deleted the cards from the bath here because we declared it in the app.js
  const { side } = req.query;
  const { id } = req.params;

  if ( !side ) {
    return res.redirect(`/cards/${id}?side=question`); // if there is no side in the path redirect to the same card when side=question
    // we put return cause in this router there is redirect and render at the same time 
  }

  const name = req.cookies.username;

  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text, name };

  if (side === "question") {  // hint show up when the question side in showing.
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = "Answer";
  } else if (side === "answer") {
    templateData.sideToShow = "question";
    templateData.sideToShowDisplay = "Question";
  }
  res.render('card', templateData); // prompt is variable name.
});

module.exports = router;
