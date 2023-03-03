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

  if (!restaurant) {
    return next(new appError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});

exports.validRestaurantByIdReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
      status: 'active',
    },
  });

  if (!restaurant) {
    return next(new appError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});
