const { Router } = require('express');
const { check } = require('express-validator');
const { createReview } = require('../controllers/reviews.controller');
const { validRestaurantById } = require('../middlewares/restaurant.middleware');

const router = Router();
//No funciona
router.post(
  '/:id ',
  [
    check('comment', 'The comment is required').not().isEmpty(),
    check('rating', 'The rating is required').not().isEmpty(),
  ],
  validRestaurantById,
  createReview
);

module.exports = {
  reviewsRouter: router,
};
