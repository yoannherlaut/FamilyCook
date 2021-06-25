const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
  name: String,
  quantity: String,
});

const recipeSchema = mongoose.Schema({
  nameRecipe: String,
  categorie: [String],
  img: String,
  numberPerson: Number,
  ingredientsList: [ingredientSchema],
  vegetarien: Boolean,
  steps: Array,
  notaBene: String,
  user: Object,
});

module.exports = mongoose.model('recipes', recipeSchema);
