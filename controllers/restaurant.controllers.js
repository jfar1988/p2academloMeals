const catchAsync = require('../helpers/catchAsync');
const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({ name, address, rating });

  res.status(201).json({
    status: 'success',
    message: 'Restaurant created successfully',
    restaurant,
  });
});

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    attributes: ['id', 'name', 'address', 'rating'],
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Categories fetched successfully',
    restaurant,
  });
});

exports.findRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    message: 'Restaurant fetched successfully',
    restaurant,
  });
});
exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'inactive' });

  res.status(200).json({
    status: 'success',
    message: 'restaurant successfully disabled',
  });
});
exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { userId } = req.sessionUser;
  const { id } = req.params;

  const review = await Review.create({
    comment,
    rating,
    userId,
    restaurantId: id,
    where: {
      status: true,
    },
    include: [{ model: Restaurant, where: { id } }],
  });

  res.status(201).json({
    status: 'success',
    message: 'Review created successfully',
    review,
  });
});
