const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes.model'); // Adjust the path as necessary

// Endpoint to display recipes based on ingredients
router.post('/results', async (req, res) => {
  const { ingredients } = req.body;
  try {
    const recipes = await Recipe.find({
      ingredients: { $all: ingredients },
    }).populate('ingredients');
    res.render('results', { recipes, session: req.session });
  } catch (err) {
    console.error(err);
    res.redirect('/home');
  }
});

// Endpoint to display a specific recipe
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients');
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.render('recipe-detail', { recipe, session: req.session });
  } catch (err) {
    console.error(err);
    res.redirect('/home');
  }
});

module.exports = router;
