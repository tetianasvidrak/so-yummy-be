const { Recipe } = require('../../models');
const { HttpError } = require('../../helpers');

const addToFavoriteRecipes = async (req, res) => {
    const { _id: userId } = req.user;
    const { id } = req.params;
  
      const isFavorite = await Recipe.findOne({ _id: id, favorites: userId });
      if (isFavorite) {
        throw HttpError(409, "This recipe is already in favorites list");
      }
      const result = await Recipe
        .findOneAndUpdate(
          { _id: id },
          { $push: { favorites: userId } },
          { new: true }
        );

    if (!result) {
      throw HttpError(400, "Something goes wrong");
    }
  
    res.status(201).json({
        status: 'success',
        code: 201,
        data: { recipe: result },
      });
  };
  
  module.exports = addToFavoriteRecipes;