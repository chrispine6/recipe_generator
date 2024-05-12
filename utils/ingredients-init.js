const mongoose = require('mongoose');
const Ingredient = require('../models/ingredients.model');

// MongoDB connection string
const dbURI = 'mongodb+srv://admin:sJTl6m5H79tugLKD@cluster0.exgioio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// List of ingredients
const ingredients = [
  'Spinach', 'Carrots', 'Broccoli', 'Garlic', 'Brussels Sprouts',
  'Kale', 'Green Peas', 'Swiss Chard', 'Beets', 'Asparagus',
  'Chicken', 'Mutton', 'Fish', 'Eggs'
];

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Ingredient.deleteMany(); // Clear existing ingredients
    await Ingredient.insertMany(ingredients.map(name => ({ name })));
    console.log('Ingredients have been initialized');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
