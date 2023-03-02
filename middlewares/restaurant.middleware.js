const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Restaurant = require('../models/restaurants.model');

exports.validRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  console.log(restaurant);

  if (!restaurant) {
    return next(new appError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});
