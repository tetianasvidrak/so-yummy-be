const Recipe = require('../../models/recipe');
const { HttpError } = require('../../helpers');

const getRecipesByCategory = async (req, res, next) => {
  const { page = 1, limit = 8, category } = req.params;
  const skip = (page - 1) * limit;
  const query = category[0].toUpperCase() + category.slice(1);

  const result = await Recipe.find(
    { category: query },
    '-createdAt -updatedAt',
    {
      skip,
      limit,
    }
  ).sort({
    createdAt: -1,
    updatedAt: -1,
  });

  if (result) {
    res.json({
      status: 'success',
      code: 200,
      data: { recipes: result, category },
    });
  } else {
    throw HttpError(404, `Recipe with ${category} not found`);
  }
};

module.exports = getRecipesByCategory;
