const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Meal = require('../models/meals.model');

exports.totalPrice = catchAsync(async (req, res, next) => {
  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });
  if (!meal) {
    return next(new appError('Order not found'));
  }

  const priceTotal = meal.price * quantity;

  req.priceTotal = meal;
  next();
});
