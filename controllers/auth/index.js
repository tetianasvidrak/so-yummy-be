const userRegister = require('./register');
const userLogin = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const subscribe = require('./subscribe');
const { ctrlWrapper } = require('../../decorators');
const uploadAvatar = require('./uploadAvatar');
const getModal = require('./getModal');
const updateUserIsInformed = require('./updateUserIsInformed');

module.exports = {
  userRegister: ctrlWrapper(userRegister),
  userLogin: ctrlWrapper(userLogin),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  subscribe: ctrlWrapper(subscribe),
  uploadAvatar: ctrlWrapper(uploadAvatar),
  getModal: ctrlWrapper(getModal),
  updateUserIsInformed: ctrlWrapper(updateUserIsInformed),
};
