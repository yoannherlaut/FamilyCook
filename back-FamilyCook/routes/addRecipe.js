const recipeModel = require('../Models/Recipe');

module.exports = async (req, res) => {
  try {
    const {
      nameRecipe,
      categorieRecipe,
      img,
      numberPerson,
      ingredientsList,
      vegetarien,
      steps,
      notaBene,
      user,
    } = req.body;

    var newRecipe = new recipeModel({
      nameRecipe: nameRecipe.toLowerCase(),
      categorie: categorieRecipe,
      img,
      numberPerson,
      ingredientsList,
      vegetarien,
      steps,
      notaBene,
      user,
    });
    const findRecipe = await recipeModel.findOne({ nameRecipe: nameRecipe.toLowerCase() });

    if (findRecipe) {
      res.json({ result: true, data: newRecipe, allReadyExist: true });
    } else {
      await newRecipe.save();
      const allRecipes = await recipeModel.find();
      res.json({ result: true, allRecipes });
    }
  } catch (err) {
    res.json({ result: false, err });
  }
};
