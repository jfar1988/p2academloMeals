const { Router } = require('express');
const { check } = require('express-validator');
const {
  createRestaurant,
  findRestaurant,
  findAllRestaurants,
  deleteRestaurant,
  createReview,
} = require('../controllers/restaurant.controllers');
const { protect } = require('../middlewares/auth.middlewares');
const { validRestaurantById } = require('../middlewares/restaurant.middleware');

const router = Router();

router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('address', 'The address is required').not().isEmpty(),
  ],
  createRestaurant
);
// restrictTo('admin'), falta implementar

router.get('/', findAllRestaurants);

router.get('/:id', validRestaurantById, findRestaurant);

router.delete('/:id', validRestaurantById, deleteRestaurant);
// restrictTo('admin'), falta implementar

router.use(protect);

router.post(
  '/reviews/:id',
  [
    check('comment', 'The comment is required').not().isEmpty(),
    check('rating', 'The rating is required').not().isEmpty(),
  ],
  protect,
  validRestaurantById,
  createReview
);

module.exports = {
  restaurantRouter: router,
};
