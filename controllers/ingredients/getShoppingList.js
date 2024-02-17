const { User } = require('../../models');
const { Ingredient } = require('../../models');
const { getIngredientInfo } = require('../../helpers');

const getShoppingList = async (req, res) => {
  const { _id } = req.user;
  const { shoppingList } = await User.findById(_id, 'shoppingList');
  const shoppingListId = shoppingList.map(({ ingredientId }) => ingredientId);
  const ingredients = await Ingredient.find(
    { _id: { $in: shoppingListId } },
    '-desc'
  );
  const result = await getIngredientInfo(shoppingList, ingredients);

  res.json({
    status: 'success',
    code: 200,
    data: { shoppingList: result },
  });
};

module.exports = getShoppingList;
