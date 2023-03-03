const { Router } = require('express');
const {
  createRestaurant,
  findRestaurant,
  findAllRestaurants,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/restaurant.controllers');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middlewares');
const {
  validRestaurantById,
  validRestaurantByIdReview,
} = require('../middlewares/restaurant.middleware');
const { validExistReview } = require('../middlewares/review.middleware');
const { validateFields } = require('../middlewares/validateField.middlewares');
const {
  createReviewValidation,
  createRestaurantValidation,
} = require('../middlewares/validations.middleware');

const router = Router();

router.post('/', createRestaurantValidation, validateFields, createRestaurant);
// restrictTo('admin'), falta implementar

router.get('/', validateFields, findAllRestaurants);

router.get('/:id', validRestaurantById, findRestaurant);

router.delete('/:id', validRestaurantById, deleteRestaurant);
// restrictTo('admin'), falta implementar

router.use(protect);

router.post(
  '/reviews/:id',
  protect,
  createReviewValidation,
  validateFields,
  validateFields,
  validRestaurantById,
  createReview
);

router.patch(
  '/reviews/:restaurantId/:id',
  createReviewValidation,
  validateFields,
  validRestaurantByIdReview,
  validExistReview,
  protectAccountOwner,
  updateReview
);

router.delete(
  '/reviews/:restaurantId/:id',
  validateFields,
  validRestaurantByIdReview,
  validExistReview,
  protectAccountOwner,
  deleteReview
);

module.exports = {
  restaurantRouter: router,
};
