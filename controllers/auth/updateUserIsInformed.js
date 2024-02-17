const { User } = require('../../models');

const { HttpError } = require('../../helpers');

const updateUserIsInformed = async (req, res) => {
  const { _id: owner, isInformed } = req.user;

  const data = await User.findByIdAndUpdate(
    { _id: owner },
    {
      isInformed: { ...isInformed, ...req.body },
    },
    {
      new: true,
    }
  );

  if (!data) {
    throw HttpError(404);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      user: { isInformed: data.isInformed },
    },
  });
};

module.exports = updateUserIsInformed;
