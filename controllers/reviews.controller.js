const catchAsync = require('../helpers/catchAsync');
const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
//NO funciona
exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;

  const review = await Review.create({
    comment,
    rating,
    // include: [{ model: Restaurant, where: { status: 'active' } }],
  });

  console.log(review);

  res.status(201).json({
    status: 'success',
    message: 'Review created successfully',
    review,
  });
});
