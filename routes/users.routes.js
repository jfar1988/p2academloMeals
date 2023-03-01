const { Router } = require('express');
const { updateUser, deleteUser } = require('../controllers/users.controller');
const { validIfExistUser } = require('../middlewares/user.middleware');

const router = Router();

router.patch('/:id', validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
