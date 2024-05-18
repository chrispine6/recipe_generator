const mongoose = require('mongoose');
const Recipe = require('../models/recipes.model');
const Ingredient = require('../models/ingredients.model');

// MongoDB connection string
const dbURI = 'mongodb+srv://admin:sJTl6m5H79tugLKD@cluster0.exgioio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const recipes = [
  {
    "name": "Vegetable Stir Fry",
    "ingredients": [
      "Spinach",
      "Carrots",
      "Broccoli",
      "Garlic"
    ],
    "description": "Heat oil in a wok or large skillet. Add minced garlic and sauté for 30 seconds. Add sliced carrots and broccoli florets, stir-fry for 2-3 minutes. Add spinach and continue stir-frying until spinach wilts and vegetables are tender-crisp. Season with soy sauce and pepper."
  },
  {
    "name": "Roasted Root Vegetables",
    "ingredients": [
      "Carrots",
      "Broccoli",
      "Brussels Sprouts",
      "Beets"
    ],
    "description": "Preheat oven to 400°F. Toss chopped carrots, broccoli florets, halved Brussels sprouts, and cubed beets with olive oil, salt, and pepper. Spread on a baking sheet and roast for 25-30 minutes, stirring occasionally, until vegetables are tender and caramelized."
  },
  {
    "name": "Garden Vegetable Soup",
    "ingredients": [
      "Spinach",
      "Carrots",
      "Broccoli",
      "Garlic",
      "Kale",
      "Green Peas",
      "Swiss Chard"
    ],
    "description": "In a large pot, sauté minced garlic in olive oil. Add chopped carrots, broccoli florets, and vegetable broth. Simmer until vegetables are tender. Stir in chopped kale, Swiss chard, green peas, and spinach. Season with salt, pepper, and herbs."
  },
  {
    "name": "Garlic Sauteed Greens",
    "ingredients": [
      "Spinach",
      "Garlic",
      "Kale",
      "Swiss Chard"
    ],
    "description": "Heat olive oil in a skillet. Add minced garlic and sauté for 30 seconds. Add chopped kale, Swiss chard, and spinach. Sauté until greens are wilted and tender. Season with salt, pepper, and a squeeze of lemon juice."
  },
  {
    "name": "Chicken or Fish with Asparagus",
    "ingredients": [
      "Chicken",
      "Fish",
      "Asparagus"
    ],
    "description": "Season chicken breasts or fish fillets with salt, pepper, and herbs. Grill, bake, or pan-fry the protein. In the last few minutes of cooking, add asparagus spears to the pan or grill and cook until tender-crisp."
  },
  {
    "name": "Beet and Kale Salad",
    "ingredients": [
      "Kale",
      "Beets"
    ],
    "description": "Massage chopped kale with olive oil and lemon juice to soften. Add roasted or boiled cubed beets, crumbled feta or goat cheese, and balsamic vinaigrette dressing."
  },
  {
    "name": "Garlic Roasted Brussels Sprouts",
    "ingredients": [
      "Brussels Sprouts",
      "Garlic"
    ],
    "description": "Preheat oven to 400°F. Toss halved Brussels sprouts with olive oil, minced garlic, salt, and pepper. Spread on a baking sheet and roast for 20-25 minutes, stirring occasionally, until sprouts are crispy and caramelized."
  },
  {
    "name": "Broccoli and Garlic Pasta",
    "ingredients": [
      "Broccoli",
      "Garlic"
    ],
    "description": "Cook pasta according to package instructions. In a skillet, sauté minced garlic in olive oil. Add broccoli florets and sauté until tender-crisp. Toss cooked pasta with the garlic-broccoli mixture, grated Parmesan cheese, and a squeeze of lemon juice."
  },
  {
    "name": "Spinach and Egg Frittata",
    "ingredients": [
      "Spinach",
      "Eggs"
    ],
    "description": "Preheat oven to 375°F. In a skillet, sauté chopped spinach with olive oil or butter until wilted. Beat eggs with salt, pepper, and any desired herbs or cheese. Pour the egg mixture over the spinach and transfer the skillet to the oven. Bake for 15-20 minutes until the frittata is set."
  },
  {
    "name": "Green Pea and Carrot Fried Rice",
    "ingredients": [
      "Green Peas",
      "Carrots"
    ],
    "description": "Cook rice according to package instructions. In a wok or large skillet, sauté minced garlic and grated ginger in oil. Add diced carrots and green peas, stir-fry for a few minutes. Add the cooked rice, soy sauce, and scrambled eggs (optional). Stir-fry until everything is combined and heated through."
  },
  {
    "name": "Mutton Stew with Root Vegetables",
    "ingredients": [
      "Mutton",
      "Carrots",
      "Brussels Sprouts",
      "Beets"
    ],
    "description": "Brown mutton pieces in a Dutch oven or heavy pot with oil. Add chopped carrots, Brussels sprouts, cubed beets, and beef broth. Season with salt, pepper, and herbs. Simmer for 1-2 hours, until mutton and vegetables are tender."
  },
  {
    "name": "Fish Tacos with Cabbage Slaw",
    "ingredients": [
      "Fish",
      "Carrots",
      "Kale"
    ],
    "description": "Grill, bake, or pan-fry fish fillets and flake into pieces. Make a slaw with shredded kale or cabbage, grated carrots, and a vinaigrette dressing. Serve the fish and slaw in warm tortillas or taco shells with desired toppings like salsa, avocado, and lime wedges."
  },
  {
    "name": "Chicken or Egg Salad with Greens",
    "ingredients": [
      "Chicken",
      "Eggs",
      "Spinach",
      "Kale",
      "Swiss Chard"
    ],
    "description": "For a chicken salad, mix shredded or diced cooked chicken with mayonnaise, diced celery, and seasonings. For an egg salad, mash hard-boiled eggs with mayonnaise, mustard, and seasonings. Serve either salad over a bed of mixed greens like spinach, kale, and Swiss chard."
  },
  {
    "name": "Garlic Roasted Asparagus",
    "ingredients": [
      "Asparagus",
      "Garlic"
    ],
    "description": "Preheat oven to 400°F. Toss asparagus spears with olive oil, minced garlic, salt, and pepper. Spread on a baking sheet and roast for 10-15 minutes, until asparagus is tender and slightly charred."
  }
]

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Recipe.deleteMany(); // Clear existing recipes

    // Fetch all ingredients from the database
    const ingredientDocs = await Ingredient.find({}, { name: 1, _id: 1 });
    const ingredientMap = {};
    ingredientDocs.forEach(ingredient => {
      ingredientMap[ingredient.name] = ingredient._id;
    });

    // Map recipe ingredients to ingredient IDs and create new Recipe documents
    const recipeDocs = recipes.map(recipe => ({
      name: recipe.name,
      ingredients: recipe.ingredients.map(name => ingredientMap[name]),
      description: recipe.description
    }));

    await Recipe.insertMany(recipeDocs);
    console.log('Recipes have been initialized');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));