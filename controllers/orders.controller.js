const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealIdD, quantity } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: mealIdD,
      status: 'active',
    },
  });
  if (!meal) {
    return next(new appError('Order not found'));
  }

  const priceTotal = meal.price * quantity;

  const order = await Order.create({
    mealId: meal.id,
    quantity,
    userId: sessionUser,
    totalPrice: priceTotal,
  });

  res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    order,
  });
});
