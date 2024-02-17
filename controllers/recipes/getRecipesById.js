const Recipe = require('../../models/recipe');
const Ingredient = require('../../models/ingredient');

const { HttpError } = require('../../helpers');
const { default: mongoose } = require('mongoose');

const getRecipesById = async (req, res, next) => {
  const { id } = req.params;

  const result = await Recipe.findById(id, '-createdAt -updatedAt');

  const ObjectId = result.ingredients.map(
    ({ id }) => new mongoose.Types.ObjectId(id)
  );

  const ingredient = await Ingredient.find({
    _id: {
      $in: ObjectId,
    },
  });

  const ingredients = result.ingredients.map(({ id, _doc }) => {
    const obj2 = ingredient.find(obj1 => obj1.id === id);
    return { ...obj2._doc, measure: _doc.measure };
  });

  if (result) {
    res.json({
      status: 'success',
      code: 200,
      data: {
        recipe: { ...result._doc, ingredients },
      },
    });
  } else {
    throw HttpError(404, `Recipe with ${id} not found`);
  }
};

module.exports = getRecipesById;
