const { Recipe } = require('../../models');

const getRecipesOfMainPage = async (req, res) => {
  const { categories = ['Breakfast', 'Miscellaneous', 'Chicken', 'Dessert'] } =
    req.body;

  const result = await Recipe.aggregate([
    {
      $match: { category: { $in: categories } },
    },

    {
      $group: {
        _id: '$category',
        recipes: { $push: '$$ROOT' },
      },
    },

    {
      $unwind: '$recipes',
    },

    {
      $sort: {
        'recipes.createdAt': -1,
        'recipes.updatedAt': -1,
      },
    },

    {
      $group: {
        _id: '$_id',
        category: { $first: '$_id' },
        recipes: { $push: '$recipes' },
      },
    },

    {
      $project: {
        category: '$_id',
        recipes: { $slice: ['$recipes', 4] },
      },
    },
  ]).sort({ category: 1 });

  res.json({
    status: 'success',
    code: 200,
    data: { recipe: result },
  });
};

module.exports = getRecipesOfMainPage;
