const { Recipe } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteOwnRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    status: 'success',
    code: 204,
    data: { recipe: result },
  });
};

module.exports = deleteOwnRecipe;
