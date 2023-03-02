const { Router } = require('express');
const {
  updateUser,
  deleteUser,
  getOrders,
  getOrder,
} = require('../controllers/users.controller');
const { protect } = require('../middlewares/auth.middlewares');
const { validIfExistUser } = require('../middlewares/user.middleware');

const router = Router();

router.use(protect);

router.get('/orders', protect, getOrders); // falta protect

router.get('/:id', protect, getOrder); // falta protect

router.patch('/:id', validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);
module.exports = {
  usersRouter: router,
};
