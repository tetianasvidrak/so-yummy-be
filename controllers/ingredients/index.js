const { ctrlWrapper } = require('../../decorators');
const getIngredientsList = require('./getIngredientsList');
const addToShoppingList = require('./addToShoppingList');
const removeFromShoppingList = require('./removeFromShoppingList');
const getShoppingList = require('./getShoppingList');
const getRecipesByIngredient = require('./getRecipesByIngredient');

module.exports = {
  getIngredientsList: ctrlWrapper(getIngredientsList),
  addToShoppingList: ctrlWrapper(addToShoppingList),
  removeFromShoppingList: ctrlWrapper(removeFromShoppingList),
  getShoppingList: ctrlWrapper(getShoppingList),
  getRecipesByIngredient: ctrlWrapper(getRecipesByIngredient),
};
