const catchAsync = require('../helpers/catchAsync');
const Meal = require('../models/meals.model');

exports.createMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const meal = await Meal.create({ name, price, restaurantId: id });

  res.status(201).json({
    status: 'success',
    message: 'Meal created successfully',
    meal,
  });
});
