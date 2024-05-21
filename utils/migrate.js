const mongoose = require('mongoose');
const connectString = 'mongodb+srv://admin:sJTl6m5H79tugLKD@cluster0.exgioio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(connectString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true }],
  description: { type: String, required: true },
  steps: [{ type: String, required: true }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

async function addLikesField() {
  try {
    const recipes = await Recipe.find({ likes: { $exists: false } });
    console.log(`Found ${recipes.length} recipes without 'likes' field.`);

    const updates = recipes.map(recipe => {
      recipe.likes = [];
      return recipe.save();
    });

    await Promise.all(updates);
    console.log('All recipes updated with empty "likes" array.');
  } catch (error) {
    console.error('Error updating recipes:', error);
  }
}

addLikesField().then(() => {
  mongoose.disconnect();
  console.log('Migration complete, database connection closed.');
});
