const { model, Schema } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for category'],
    },
  },
  { versionKey: false, timestamps: true }
);

categoriesSchema.post('save', handleMongooseError);

const Category = model('category', categoriesSchema);

module.exports = Category;
