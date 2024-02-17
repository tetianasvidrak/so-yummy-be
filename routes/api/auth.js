const express = require('express');
const { validateBody } = require('../../decorators');
const { authSchema } = require('../../schemas');
const { motivatingModalSchema } = require('../../schemas');

const userAuth = require('../../controllers/auth');
const {
  authenticate,
  upload,
  validateFormNameBody,
} = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(authSchema), userAuth.userRegister);
router.post('/login', validateBody(authSchema), userAuth.userLogin);
router.get('/current', authenticate, userAuth.getCurrent);
router.post('/logout', authenticate, userAuth.logout);
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  validateFormNameBody,
  userAuth.uploadAvatar
);
router.post('/subscribe', authenticate, userAuth.subscribe);
router.get('/modal', authenticate, userAuth.getModal);
router.patch(
  '/isinformed',
  authenticate,
  validateBody(motivatingModalSchema),
  userAuth.updateUserIsInformed
);

module.exports = router;
