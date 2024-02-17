const { Category } = require('../../models');

const getCategoryList = async (req, res) => {
  const result = await Category.find({}, '-createdAt -updatedAt').sort({
    name: 1,
  });
  res.json({
    status: 'success',
    code: 200,
    data: { recipe: result },
  });
};

module.exports = getCategoryList;
