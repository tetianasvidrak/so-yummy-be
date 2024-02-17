const { Recipe } = require('../../models');

const getModal = async (req, res) => {
  const { _id: userId, createdAt, updatedAt, isInformed } = req.user;

  const numberOfDaysInApp = Math.ceil(
    (updatedAt.getTime() - createdAt.getTime()) / (1000 * 3600 * 24)
  );

  const numberOfAddedRecipes = await Recipe.countDocuments({ owner: userId });
  const numberOfFavoriteRecipes = await Recipe.countDocuments({
    favorites: userId,
  });

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        userId,
        newUser: isInformed.newUser,
        daysInApp: {
          number: numberOfDaysInApp,
          isInformed: isInformed.daysInApp,
        },
        addedRecipes: {
          number: numberOfAddedRecipes,
          isInformed: isInformed.addedRecipes,
        },
        favoriteRecipes: {
          number: numberOfFavoriteRecipes,
          isInformed: isInformed.favoriteRecipes,
        },
      },
    },
  });
};

module.exports = getModal;
