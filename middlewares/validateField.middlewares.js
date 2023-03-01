const { validationResult, check } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.sigupValidations = [
  check('name', 'the name is required').not().isEmpty(),
  check('email', 'the email is required').not().isEmpty(),
  check('email', 'the email must have a correct format').isEmail(),
  check('password', 'the password is required').not().isEmpty(),
];

exports.loginValidation = [
  check('email', 'the email is required').not().isEmpty(),
  check('email', 'the email must have a correct format').isEmail(),
  check('password', 'the password is required').not().isEmpty(),
];
