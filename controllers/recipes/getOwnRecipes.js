const { Recipe } = require('../../models');
const { HttpError } = require('../../helpers');

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 4;

  const count = await Recipe.countDocuments({ owner });
  const totalPages = Math.ceil(count / pageSize);

  const skip = (page - 1) * pageSize;

  const data = await Recipe.find({ owner }, '-createdAt -updatedAt')
  .skip(skip)
  .limit(pageSize);

  if (!data) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    status: 'success',
    code: 200,
    data: { recipe: data,
      totalPages: totalPages,
      currentPage: page,
      perPage: pageSize,
      totalOwnRecipes: count,},
  });
};

module.exports = getOwnRecipes;
