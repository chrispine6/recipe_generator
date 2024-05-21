const mongoose = require('mongoose');
const Recipe = require('../models/recipes.model');
const Ingredient = require('../models/ingredients.model');

// Corrected MongoDB connection string
const dbURI = 'mongodb+srv://admin:sJTl6m5H79tugLKD@cluster0.exgioio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Recipe.deleteMany();

    const ingredientDocs = await Ingredient.find({}, { name: 1, _id: 1 });
    const ingredientMap = {};
    ingredientDocs.forEach(ingredient => {
      ingredientMap[ingredient.name] = ingredient._id;
    });

    const recipes = [
      {
        name: "Vegetable Stir Fry",
        ingredients: ["Spinach", "Carrots", "Broccoli", "Garlic"],
        description: "A quick and flavorful stir-fry with fresh vegetables.",
        steps: [
          "Heat oil in a wok or large skillet over high heat.",
          "Add minced garlic and sauté for 30 seconds.",
          "Add sliced carrots and broccoli florets, stir-fry for 2-3 minutes.",
          "Add spinach and continue stir-frying until spinach wilts and vegetables are tender-crisp.",
          "Season with soy sauce and pepper."
        ]
      },
      {
        name: "Roasted Root Vegetables",
        ingredients: ["Carrots", "Broccoli", "Brussels Sprouts", "Beets"],
        description: "Roasted root vegetables with a caramelized flavor.",
        steps: [
          "Preheat oven to 400°F.",
          "Toss chopped carrots, broccoli florets, halved Brussels sprouts, and cubed beets with olive oil, salt, and pepper.",
          "Spread the vegetables on a baking sheet in a single layer.",
          "Roast for 25-30 minutes, stirring occasionally, until vegetables are tender and caramelized."
        ]
      },
      {
        name: "Garden Vegetable Soup",
        ingredients: ["Spinach", "Carrots", "Broccoli", "Garlic", "Kale", "Green Peas", "Swiss Chard"],
        description: "A hearty and nutrient-packed vegetable soup.",
        steps: [
          "In a large pot, sauté minced garlic in olive oil.",
          "Add chopped carrots, broccoli florets, and vegetable broth. Bring to a boil.",
          "Reduce heat and simmer until vegetables are tender.",
          "Stir in chopped kale, Swiss chard, green peas, and spinach.",
          "Season with salt, pepper, and herbs of your choice."
        ]
      },
      {
        name: "Garlic Sauteed Greens",
        ingredients: ["Spinach", "Garlic", "Kale", "Swiss Chard"],
        description: "A quick side dish of sauteed greens with garlic.",
        steps: [
          "Heat olive oil in a skillet over medium-high heat.",
          "Add minced garlic and sauté for 30 seconds.",
          "Add chopped kale, Swiss chard, and spinach.",
          "Sauté until greens are wilted and tender, about 5-7 minutes.",
          "Season with salt, pepper, and a squeeze of lemon juice."
        ]
      },
      {
        name: "Chicken or Fish with Asparagus",
        ingredients: ["Chicken", "Fish", "Asparagus"],
        description: "A simple and healthy protein dish with asparagus.",
        steps: [
          "Season chicken breasts or fish fillets with salt, pepper, and herbs of your choice.",
          "Grill, bake, or pan-fry the protein until cooked through.",
          "In the last few minutes of cooking, add asparagus spears to the pan or grill.",
          "Cook until asparagus is tender-crisp."
        ]
      },
      {
        name: "Beet and Kale Salad",
        ingredients: ["Kale", "Beets"],
        description: "A nutrient-rich salad with beets and kale.",
        steps: [
          "Massage chopped kale with olive oil and lemon juice to soften.",
          "Add roasted or boiled cubed beets.",
          "Crumble feta or goat cheese over the salad.",
          "Drizzle with balsamic vinaigrette dressing."
        ]
      },
      {
        name: "Garlic Roasted Brussels Sprouts",
        ingredients: ["Brussels Sprouts", "Garlic"],
        description: "Crispy and flavorful roasted Brussels sprouts.",
        steps: [
          "Preheat oven to 400°F.",
          "Toss halved Brussels sprouts with olive oil, minced garlic, salt, and pepper.",
          "Spread the Brussels sprouts on a baking sheet in a single layer.",
          "Roast for 20-25 minutes, stirring occasionally, until crispy and caramelized."
        ]
      },
      {
        name: "Broccoli and Garlic Pasta",
        ingredients: ["Broccoli", "Garlic"],
        description: "A simple and flavorful pasta dish with broccoli and garlic.",
        steps: [
          "Cook pasta according to package instructions.",
          "In a skillet, sauté minced garlic in olive oil.",
          "Add broccoli florets and sauté until tender-crisp.",
          "Toss cooked pasta with the garlic-broccoli mixture.",
          "Add grated Parmesan cheese and a squeeze of lemon juice."
        ]
      },
      {
        name: "Spinach and Egg Frittata",
        ingredients: ["Spinach", "Eggs"],
        description: "A baked egg dish with spinach.",
        steps: [
          "Preheat oven to 375°F.",
          "In a skillet, sauté chopped spinach with olive oil or butter until wilted.",
          "Beat eggs with salt, pepper, and any desired herbs or cheese.",
          "Pour the egg mixture over the spinach in the skillet.",
          "Transfer the skillet to the oven and bake for 15-20 minutes until the frittata is set."
        ]
      },
      {
        name: "Green Pea and Carrot Fried Rice",
        ingredients: ["Green Peas", "Carrots"],
        description: "A flavorful fried rice with green peas and carrots.",
        steps: [
          "Cook rice according to package instructions.",
          "In a wok or large skillet, sauté minced garlic and grated ginger in oil.",
          "Add diced carrots and green peas, stir-fry for a few minutes.",
          "Add the cooked rice, soy sauce, and scrambled eggs (optional).",
          "Stir-fry until everything is combined and heated through."
        ]
      },
      {
        name: "Mutton Stew with Root Vegetables",
        ingredients: ["Mutton", "Carrots", "Brussels Sprouts", "Beets"],
        description: "A hearty and comforting mutton stew with root vegetables.",
        steps: [
          "Brown mutton pieces in a Dutch oven or heavy pot with oil.",
          "Add chopped carrots, Brussels sprouts, cubed beets, and beef broth.",
          "Season with salt, pepper, and herbs of your choice.",
          "Bring to a boil, then reduce heat and simmer for 1-2 hours, until mutton and vegetables are tender."
        ]
      },
      {
        name: "Fish Tacos with Cabbage Slaw",
        ingredients: ["Fish", "Carrots", "Kale"],
        description: "Fresh fish tacos with a crunchy cabbage slaw.",
        steps: [
          "Grill, bake, or pan-fry fish fillets until fully cooked and flake into pieces.",
          "Make a slaw with shredded kale or cabbage and grated carrots, dressed with a vinaigrette.",
          "Serve the flaked fish and slaw in warm tortillas or taco shells.",
          "Top with salsa, avocado, and lime wedges as desired."
        ]
      },
      {
        name: "Chicken or Egg Salad with Greens",
        ingredients: ["Chicken", "Eggs", "Spinach", "Kale", "Swiss Chard"],
        description: "A versatile salad using either chicken or eggs over a bed of mixed greens.",
        steps: [
          "For chicken salad: mix shredded or diced cooked chicken with mayonnaise, diced celery, and seasonings.",
          "For egg salad: mash hard-boiled eggs with mayonnaise, mustard, and seasonings.",
          "Serve either salad over a bed of mixed greens such as spinach, kale, and Swiss chard.",
          "Optionally, add additional toppings like nuts or dried fruit for added texture."
        ]
      },
      {
        name: "Garlic Roasted Asparagus",
        ingredients: ["Asparagus", "Garlic"],
        description: "Perfectly roasted asparagus with a hint of garlic.",
        steps: [
          "Preheat oven to 400°F.",
          "Toss asparagus spears with olive oil, minced garlic, salt, and pepper.",
          "Arrange on a baking sheet in a single layer.",
          "Roast for 10-15 minutes, until asparagus is tender and slightly charred."
        ]
      }
    ];

    // Map recipe ingredients to ingredient IDs and create new Recipe documents including steps
    const recipeDocs = recipes.map(recipe => ({
      name: recipe.name,
      ingredients: recipe.ingredients.map(name => ingredientMap[name]),
      description: recipe.description,
      steps: recipe.steps
    }));

    await Recipe.insertMany(recipeDocs);
    console.log('Recipes have been initialized');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
