const { Router } = require('express');

const {
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders.controller');
const { getOrders } = require('../controllers/users.controller');
const { protect } = require('../middlewares/auth.middlewares');
const { findOneOrder } = require('../middlewares/findOneOrder');

const router = Router();

router.post('/', protect, createOrder);

router.get('/me', protect, getOrders);

router.patch('/:id', protect, findOneOrder, updateOrder);

router.delete('/:id', protect, findOneOrder, deleteOrder);

module.exports = {
  ordersRouter: router,
};
