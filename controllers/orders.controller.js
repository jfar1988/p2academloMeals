const catchAsync = require('../helpers/catchAsync');
const Order = require('../models/orders.model');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;

  const order = await Order.create({ mealId, quantity });

  res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    order,
  });
});
