const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new appError('Order not found', 400));
  }

  const priceTotal = meal.price * quantity;

  const order = await Order.create({
    mealId,
    quantity,
    userId: sessionUser.id,
    totalPrice: priceTotal,
  });

  res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  if (!order) {
    res.status(401).json({
      status: 'error',
      message: 'there is no order for this user',
    });
  }

  const orderUpdate = await order.update({ status: 'completed' });

  return res.status(201).json({
    status: 'SUCCESS',
    message: `the order has been completed successfully`,
    orderUpdate,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  if (!order) {
    res.status(401).json({
      status: 'error',
      message: 'there is no order for this user',
    });
  }

  const orderDelete = await order.update({ status: 'cancelled' });

  return res.status(201).json({
    status: 'SUCCESS',
    message: `the order has been cancelled successfully`,
    orderDelete,
  });
});
