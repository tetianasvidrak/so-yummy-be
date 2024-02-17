const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const DEFAULT_RECIPE_IMAGE_URL =
    'https://asset.cloudinary.com/dcfetki7g/bee91b06a3746b38c303d04a36fd77aa';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Specify title for your recipe'],
    },
    description: {
      type: String,
      required: [true, 'Specify description for your recipe'],
    },
    category: {
      type: String,
      required: [true, 'Specify category for your recipe'],
    },
    time: {
      type: String,
      required: [true, 'Set cooking time for your recipe'],
    },
    ingredients: [
      {
        _id: false,
        id: {
          type: String,
          required: true,
          ref: 'ingredient',
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: {
      type: Array,
      required: [true, 'Describe recipe preparation'],
    },
    thumb: {
      type: String,
      default: DEFAULT_RECIPE_IMAGE_URL,
    },
    preview: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post('save', handleMongooseError);

const Recipe = model('recipe', recipeSchema);

module.exports = Recipe;
