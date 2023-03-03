const { Router } = require('express');
const {
  updateUser,
  deleteUser,
  getOrders,
  getOrderById,
} = require('../controllers/users.controller');
const { protect } = require('../middlewares/auth.middlewares');
const { findOneOrder } = require('../middlewares/findOneOrder');
const { validIfExistUser } = require('../middlewares/user.middleware');

const router = Router();

router.get('/orders', protect, getOrders); // falta protect

router.get('/orders/:id', protect, findOneOrder, getOrderById); // falta protect

router.patch('/:id', validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
