const { model, Schema } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const ingredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for ingredient'],
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

ingredientsSchema.post('save', handleMongooseError);

const Ingredient = model('ingredient', ingredientsSchema);

module.exports = Ingredient;
