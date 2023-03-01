const { Router } = require('express');
const { createUser, login } = require('../controllers/auth.controller');
const {
  validateFields,
  sigupValidations,
} = require('../middlewares/validateField.middlewares');

const router = Router();

router.post('/signup', sigupValidations, validateFields, createUser);

router.post('/login', sigupValidations, validateFields, login);

module.exports = {
  authRouter: router,
};
