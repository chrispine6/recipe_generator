const mongoose = require('mongoose');
const Recipe = require('../models/recipes.model');
const Ingredient = require('../models/ingredients.model');

// MongoDB connection string
const dbURI = 'mongodb+srv://admin:sJTl6m5H79tugLKD@cluster0.exgioio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// List of recipes
const recipes = [
  { name: 'Chicken Stir Fry', ingredients: ['Chicken', 'Garlic', 'Broccoli'] },
  { name: 'Vegetable Soup', ingredients: ['Carrots', 'Spinach', 'Garlic'] },
  { name: 'Spinach and Garlic Stir-Fry', ingredients: ['Spinach', 'Garlic'] },
  { name: 'Carrot and Broccoli Salad', ingredients: ['Carrots', 'Broccoli'] },
  { name: 'Brussels Sprouts and Kale Chips', ingredients: ['Brussels Sprouts', 'Kale'] },
  { name: 'Green Peas and Asparagus Risotto', ingredients: ['Green Peas', 'Asparagus'] },
  { name: 'Swiss Chard and Beet Salad', ingredients: ['Swiss Chard', 'Beets'] },
  { name: 'Chicken and Spinach Stir-Fry', ingredients: ['Chicken', 'Spinach', 'Garlic'] },
  { name: 'Mutton Stew with Carrots and Broccoli', ingredients: ['Mutton', 'Carrots', 'Broccoli', 'Garlic'] },
  { name: 'Fish and Asparagus Bake', ingredients: ['Fish', 'Asparagus', 'Garlic'] },
  { name: 'Egg and Brussels Sprouts Frittata', ingredients: ['Eggs', 'Brussels Sprouts', 'Garlic'] },
  { name: 'Chicken, Kale, and Green Peas Soup', ingredients: ['Chicken', 'Kale', 'Green Peas', 'Garlic'] },
  { name: 'Mutton and Beet Salad', ingredients: ['Mutton', 'Beets', 'Swiss Chard'] },
  { name: 'Fish, Carrots, and Green Peas Stir-Fry', ingredients: ['Fish', 'Carrots', 'Green Peas', 'Garlic'] },
  { name: 'Asparagus and Chicken Skewers', ingredients: ['Asparagus', 'Chicken', 'Garlic'] },
  { name: 'Spinach and Egg Breakfast Wrap', ingredients: ['Spinach', 'Eggs', 'Garlic'] },
  { name: 'Brussels Sprouts, Carrots, and Fish Bake', ingredients: ['Brussels Sprouts', 'Carrots', 'Fish', 'Garlic'] }
];

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Recipe.deleteMany(); // Clear existing recipes

    // Fetch all ingredients from the database
    const ingredientDocs = await Ingredient.find();
    const ingredientMap = {};
    ingredientDocs.forEach(ingredient => {
      ingredientMap[ingredient.name] = ingredient._id;
    });

    // Map recipe ingredients to ingredient IDs
    const recipesWithIds = recipes.map(recipe => ({
      name: recipe.name,
      ingredients: recipe.ingredients.map(name => ingredientMap[name])
    }));

    await Recipe.insertMany(recipesWithIds);
    console.log('Recipes have been initialized');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
