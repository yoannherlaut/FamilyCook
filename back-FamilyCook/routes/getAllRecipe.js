const recipeModel = require('../Models/Recipe');

module.exports = async (req, res) => {
  try {
    const allRecipes = await recipeModel.find();

    if (allRecipes.length > 0) {
      res.json({ result: true, allRecipes });
    } else {
      res.json({ result: false });
    }
  } catch (err) {
    res.json({ result: false, err });
  }
};
