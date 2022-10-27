const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const ratatouille = { 
  title:'Ratatouille', 
  level:'Easy Peasy', 
  cuisine: 'French',
  dishType: 'other',
  image: 'https://img.buzzfeed.com/video-api-prod/assets/eb44570519264864814264f7f0a5e47a/BFV13909_BakedRatatouille-ThumbTextless1080.jpg?output-format=auto&output-quality=auto&resize=600:*',
  duration: 45,
}

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    await Recipe.create(ratatouille);
    // Run your code here, after you have insured that the connection was made
    let manyRecipes = await Recipe.insertMany(data);
    manyRecipes.forEach((Recipes => console.log(Recipes.title)));

    let updateRecipe = await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, {duration: 100});
    console.log(`Rigatoni alla Genovese updated`);

    await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log(`Carrot Cake deleted`)

    mongoose.disconnect();
    
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
