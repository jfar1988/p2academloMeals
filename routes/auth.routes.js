const { Router } = require('express');
const { createUser, login } = require('../controllers/auth.controller');
const {
  validIfExistUserEmail,
  validPassword,
} = require('../middlewares/user.middleware');
const {
  validateFields,
  sigupValidations,
  loginValidation,
} = require('../middlewares/validateField.middlewares');
const User = require('../models/users.model');

const router = Router();

router.post(
  '/signup',
  sigupValidations,
  validateFields,
  validIfExistUserEmail,
  // validPassword (no recibe el user),
  createUser
);

router.post('/login', loginValidation, validateFields, login);

module.exports = {
  authRouter: router,
};
