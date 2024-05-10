const mongoose = require('mongoose');
const Ingredient = require('../models/ingredient.model');

const ingredients = [
  { name: 'Spinach', category: 'Vegetables' },
  { name: 'Carrots', category: 'Vegetables' },
  { name: 'Broccoli', category: 'Vegetables' },
  { name: 'Garlic', category: 'Vegetables' },
  { name: 'Brussels Sprouts', category: 'Vegetables' },
  { name: 'Kale', category: 'Vegetables' },
  { name: 'Green Peas', category: 'Vegetables' },
  { name: 'Swiss Chard', category: 'Vegetables' },
  { name: 'Beets', category: 'Vegetables' },
  { name: 'Asparagus', category: 'Vegetables' },
  { name: 'Chicken', category: 'Meats and Eggs' },
  { name: 'Mutton', category: 'Meats and Eggs' },
  { name: 'Fish', category: 'Meats and Eggs' },
  { name: 'Eggs', category: 'Meats and Eggs' },
];

mongoose.connect('mongodb+srv://admin:sJTl6m5H79tugLKD@recipecluster0.gb7q7h1.mongodb.net/recipeDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
  await Ingredient.deleteMany({});
  await Ingredient.insertMany(ingredients);
  console.log('Ingredients have been initialized');
  mongoose.disconnect();
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});
