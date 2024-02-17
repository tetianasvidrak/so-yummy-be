const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { HttpError } = require('../../helpers');

const { JWT_SECRET } = process.env;

const userRegister = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    isInformed: {
      newUser: true,
      daysInApp: false,
      addedRecipes: false,
      favoriteRecipes: false,
    },
  });

  const { _id: id } = newUser;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  await User.findByIdAndUpdate(id, { token });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      token,
      user: {
        userId: id,
        name,
        email,
      },
    },
  });
};

module.exports = userRegister;
