const { model, Schema } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dcfetki7g/image/upload/v1689155120/avatars/man.png.png';

const userSchema = new Schema(
  {
    name: { type: String },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: {
      type: String,
      default: DEFAULT_AVATAR,
    },
    token: {
      type: String,
    },
    subscription: {
      type: Boolean,
      default: false,
    },
    shoppingList: {
      _id: false,
      type: [
        {
          ingredientId: {
            type: Schema.Types.ObjectId,
            ref: 'ingredient',
          },
          recipeId: {
            type: Schema.Types.ObjectId,
            ref: 'recipe',
          },
          measure: {
            type: [String],
            default: [],
          },
          name: {
            type: String,
          },
        },
      ],
      default: [],
    },
    isInformed: {
      newUser: {
        type: Boolean,
        default: false,
      },
      daysInApp: {
        type: Boolean,
        default: false,
      },
      addedRecipes: {
        type: Boolean,
        default: false,
      },
      favoriteRecipes: {
        type: Boolean,
        default: false,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
