const catchAsync = require('../helpers/catchAsync');
const Meal = require('../models/meals.model');

exports.findOneMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //encontramos la reparacion por id y status
  const meal = await Meal.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: 'meal not found',
    });
  }
  req.meal = meal;
  next();
});
