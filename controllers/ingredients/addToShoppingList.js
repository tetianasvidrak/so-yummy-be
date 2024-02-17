const { User } = require('../../models');
const { Ingredient } = require('../../models');
const { getIngredientInfo } = require('../../helpers');

const addToShoppingList = async (req, res) => {
  const { _id } = req.user;
  const { ingredientId, measure, recipeId } = req.body;
  const { shoppingList } = await User.findByIdAndUpdate(
    _id,
    { $push: { shoppingList: { ingredientId, measure, recipeId } } },
    { new: true }
  );
  const shoppingListId = shoppingList.map(({ ingredientId }) => ingredientId);
  const ingredients = await Ingredient.find({ _id: { $in: shoppingListId } }, '-desc');
  const result = await getIngredientInfo(shoppingList, ingredients);
 
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { shoppingList: result },
  });
};

module.exports = addToShoppingList;
