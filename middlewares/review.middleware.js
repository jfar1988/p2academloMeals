const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Review = require('../models/reviews.model');
const User = require('../models/users.model');

exports.validExistReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!review) {
    return next(new appError('Review Not Found', 404));
  }

  req.review = review;
  req.user = review.user;
  next();
});
