const express = require('express'),
  router = express.Router(),
  login = require('./login'),
  addUser = require('./addUser'),
  getAllRecipe = require('./getAllRecipe'),
  deleteRecipe = require('./deleteRecipe'),
  getRecipe = require('./getRecipe'),
  modifyRecipe = require('./modifyRecipe'),
  addRecipe = require('./addRecipe');

router.get('/getAllRecipe', (req, res, next) => {
  getAllRecipe(req, res, next);
});

router.post('/addRecipe', (req, res, next) => {
  addRecipe(req, res, next);
});

router.put('/:recipeId', (req, res, next) => {
  modifyRecipe(req, res, next);
});

router.post('/login', (req, res, next) => {
  login(req, res, next);
});

router.post('/createUser', (req, res, next) => {
  addUser(req, res, next);
});

router.get('/getRecipe/:recipeId', (req, res, next) => {
  getRecipe(req, res, next);
});

router.delete('/:recipeId', (req, res, next) => {
  deleteRecipe(req, res, next);
});

module.exports = router;
