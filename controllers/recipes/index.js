const { ctrlWrapper } = require('../../decorators');
const addOwnRecipe = require('./addOwnRecipe');
const deleteOwnRecipe = require('./deleteOwnRecipe');
const getOwnRecipes = require('./getOwnRecipes');
const addToFavoriteRecipes = require('./addToFavoriteRecipes');
const deleteFromFavoriteRecipes = require('./deleteFromFavoriteRecipes');
const getFavoriteRecipes = require('./getFavoriteRecipes');
const getRecipesOfMainPage = require('./getRecipesOfMainPage');
const getRecipesByTitle = require('./getRecipesByTitle');
const getRecipesById = require('./getRecipesById');
const getRecipesByCategory = require('./getRecipesByCategory');
const getCategoryList = require('./getCategoryList');
const getPopularRecipes = require('./getPopularRecipes');

module.exports = {
  getRecipesOfMainPage: ctrlWrapper(getRecipesOfMainPage),
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  deleteOwnRecipe: ctrlWrapper(deleteOwnRecipe),
  addToFavoriteRecipes: ctrlWrapper(addToFavoriteRecipes),
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  deleteFromFavoriteRecipes: ctrlWrapper(deleteFromFavoriteRecipes),
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  getRecipesByTitle: ctrlWrapper(getRecipesByTitle),
  getRecipesById: ctrlWrapper(getRecipesById),
  getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
  getCategoryList: ctrlWrapper(getCategoryList),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
};
