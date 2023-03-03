const catchAsync = require('../helpers/catchAsync');
const Order = require('../models/orders.model');
const User = require('../models/users.model');

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'The user correctly changed the name and email',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'Success',
    message: 'The user has been deleted successfully',
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const user = await User.findAll({
    include: [
      {
        model: Order,
        where: {
          userId: sessionUser.id,
          status: 'active',
        },
      },
    ],
  });

  res.status(200).json({
    status: 'Success',
    message: 'The users were successfully found',
    user,
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const { order } = req;

  if (!order) {
    res.status(400).json({
      status: 'Error',
      message: 'The order was not found',
    });
  }

  res.status(200).json({
    status: 'Success',
    message: 'The order were successfully found',
    order,
  });
});
