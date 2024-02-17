const { Ingredient } = require('../../models');

const getIngredientsList = async (req, res) => {
  const result = await Ingredient.find({});

  res.json({
    status: 'success',
    code: 200,
    data: { ingredients: result },
  });
};

module.exports = getIngredientsList;
