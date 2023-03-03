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
