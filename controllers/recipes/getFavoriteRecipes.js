const { Recipe } = require('../../models');
const { HttpError } = require('../../helpers');

const getFavoriteRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 4;

  const count = await Recipe.countDocuments({ favorites: userId });
  const totalPages = Math.ceil(count / pageSize);

  const skip = (page - 1) * pageSize;

  const result = await Recipe.find(
    { favorites: userId },
    '-createdAt -updatedAt'
  )
  .skip(skip)
  .limit(pageSize);

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { recipe: result,
    totalPages: totalPages,
    currentPage: page,
    perPage: pageSize,
    totalFavorites: count,
},
  });
};
module.exports = getFavoriteRecipes;
