const { Recipe } = require('../../models');

const getRecipesByTitle = async (req, res) => {
  const title = req.query?.q || req.query.title;
  const query = title[0].toUpperCase() + title.slice(1);

  const data = await Recipe.find(
    {
      title: { $regex: query, $options: 'i' },
    },
    '-createdAt -updatedAt'
  ).sort({
    createdAt: -1,
    updatedAt: -1,
  });

  res.json({
    status: 'success',
    code: 200,
    data: {
      recipe: data,
    },
  });
};

module.exports = getRecipesByTitle;
