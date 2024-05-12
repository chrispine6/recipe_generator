// /middleware/searchMiddleware.js

const Recipe = require('../models/recipes.model');

module.exports.searchRecipes = async (req, res, next) => {
  const { ingredients } = req.body;

  try {
    const recipes = await Recipe.find({
      ingredients: { $all: ingredients }
    });

    req.recipes = recipes;
    next();
  } catch (err) {
    console.error(err);
    res.redirect('/search');
  }
};
