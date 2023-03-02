const { Router } = require('express');
const { check } = require('express-validator');
const { createOrder } = require('../controllers/orders.controller');
const { protect } = require('../middlewares/auth.middlewares');

const router = Router();

router.use(protect);

router.post(
  '/',
  [
    check('mealId', 'The mealId is required').not().isEmpty(),
    check('quantity', 'The quantity is required').not().isEmpty(),
  ],
  protect,
  createOrder
);

module.exports = {
  ordersRouter: router,
};
