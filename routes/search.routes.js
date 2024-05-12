const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes.model');

// Search Results Route
router.post('/results', async (req, res) => {
  const { ingredients } = req.body;

  try {
    const recipes = await Recipe.find({ ingredients: { $all: ingredients } }).populate('ingredients');
    res.render('results', { recipes });
  } catch (err) {
    console.error(err);
    res.redirect('/home');
  }
});

module.exports = router;
