const { default: mongoose } = require('mongoose');
const { Ingredient } = require('../../models');
const { Recipe } = require('../../models');

const getRecipesByIngredient = async (req, res) => {
  const ingredient = req.query?.q || req.query.ing;
  const query = ingredient[0].toUpperCase() + ingredient.slice(1);

  const ing = await Ingredient.find(
    {
      name: { $regex: query, $options: 'i' },
    },
    '_id'
  );

  const result = ing.map(({ _id }) => new mongoose.Types.ObjectId(_id));

  const data = await Recipe.find(
    {
      ingredients: {
        $elemMatch: {
          id: { $in: result },
        },
      },
    },
    '-createdAt -updatedAt'
  );

  res.json({
    status: 'success',
    code: 200,
    data: {
      recipe: data,
    },
  });
};

module.exports = getRecipesByIngredient;
