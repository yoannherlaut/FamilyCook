const recipeModel = require('../Models/Recipe');

module.exports = async (req, res) => {
  try {
    const findRecipe = await recipeModel.findOne({ _id: req.params.recipeId });

    if (findRecipe) {
      res.json({ result: true, data: findRecipe });
    } else {
      res.json({ result: false });
    }
  } catch (err) {
    res.json({ result: false, err });
  }
};
