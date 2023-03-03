const { check } = require('express-validator');

exports.createRestaurantValidation = [
  check('name', 'The name is required').not().isEmpty(),
  check('address', 'The address is required').not().isEmpty(),
];
exports.loginValidation = [
  check('email', 'the email is required').not().isEmpty(),
  check('email', 'the email is required').isEmail(),
  check('password', 'the password is required').not().isEmpty(),
];

exports.updateUserValidation = [
  check('name', 'the name is required').not().isEmpty(),
  check('email', 'the email is required').not().isEmpty(),
  check('email', 'the email is required').isEmail(),
];

exports.createRestaurantValidation = [
  check('name', 'the name is required').not().isEmpty(),
  check('address', 'the address is required').not().isEmpty(),
  check('price', 'the rating is required').not().isEmpty(),
  check('rating', 'the rating is required').isNumeric(),
];

exports.createReviewValidation = [
  check('comment', 'the comment is required').not().isEmpty(),
  check('rating', 'the rating is required').not().isEmpty(),
  check('rating', 'the rating is required').isNumeric(),
];

exports.createMealsValidation = [
  check('name', 'the name is required').not().isEmpty(),
  check('price', 'the price is required').not().isEmpty(),
  check('price', 'the price is numeric').isNumeric(),
];

exports.createOrderValidation = [
  [
    check('mealId', 'The mealId is required').not().isEmpty(),
    check('quantity', 'The quantity is required').not().isEmpty(),
  ],
];
