const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const Ingredient = require('../models/ingredients.model');

// Home Page Route
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.render('home', { ingredients });
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
});

module.exports = router;
