const { Recipe } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteFromFavoriteRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const deleteRecipe = async () => {
    const isFavorite = await Recipe.findOne({ _id: id, favorites: userId });
    if (!isFavorite) {
      throw HttpError(409, 'There is no such recipe in favorites list');
    }
    const deletedRecipe = await Recipe.findOneAndUpdate(
      { _id: id },
      { $pull: { favorites: userId } },
      { new: true }
    );
    return deletedRecipe;
  };

  const result = await deleteRecipe(Recipe);

  if (!result) {
    throw HttpError(400, 'Something goes wrong');
  }

  res.json({
    status: 'success',
    code: 204,
    data: { recipe: result },
  });
};

module.exports = deleteFromFavoriteRecipes;
