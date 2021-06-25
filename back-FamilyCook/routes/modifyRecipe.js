const recipeModel = require('../Models/Recipe');

module.exports = async (req, res) => {
  try {
    const { newRecipe } = req.body;

    const recipe = await recipeModel.findOneAndReplace({ _id: req.params.recipeId }, newRecipe);

    const findRecipe = await recipe.save();

    if (findRecipe) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  } catch (err) {
    res.json({ result: false, err });
  }
};
