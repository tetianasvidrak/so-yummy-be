const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next(error);
  };

  return func;
};

const validateFormDataBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(JSON.parse(req.body.data));
    if (error) {
      next(HttpError(400, error.message));
    }
    next(error);
  };

  return func;
};

module.exports = { validateBody, validateFormDataBody };