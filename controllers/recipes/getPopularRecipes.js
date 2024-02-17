const { Recipe } = require('../../models');

const getPopularRecipes = async (req, res) => {
  const result = await Recipe.aggregate([
    {
      $addFields: {
        popularity: {
          $cond: {
            if: { $isArray: '$favorites' },
            then: { $size: '$favorites' },
            else: 0,
          },
        },
      },
    },
    { $match: { popularity: { $gt: 0 } } },
    { $sort: { popularity: -1 } },
    { $limit: 6 },
  ]);

  res.json({
    status: 'success',
    code: 200,
    data: { recipe: result },
  });
};

module.exports = getPopularRecipes;
