const { Recipe } = require('../../models');

const addOwnRecipe = async (req, res) => {
  const { _id: owner } = req.user;

  const data = JSON.parse(req.body.data);

  const result = await Recipe.create({
    ...data,
    thumb: req.file?.path,
    owner,
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { recipe: result },
  });
};

module.exports = addOwnRecipe;
