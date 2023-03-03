const { Router } = require('express');

const { createOrder } = require('../controllers/orders.controller');
const { protect } = require('../middlewares/auth.middlewares');

const router = Router();

router.post('/', protect, createOrder);

module.exports = {
  ordersRouter: router,
};
