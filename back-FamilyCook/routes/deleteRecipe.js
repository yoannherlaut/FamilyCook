const recipeModel = require('../Models/Recipe');

module.exports = async (req, res, next) => {
  try {
    await recipeModel.findByIdAndDelete(req.params.recipeId);

    const allRecipes = await recipeModel.find();
    res.json({ result: true, allRecipes });
  } catch (err) {
    res.json({ result: false, err });
  }
};
