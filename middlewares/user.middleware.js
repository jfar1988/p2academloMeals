const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/users.model');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });
  if (!user) {
    return next(new appError('User not found', 404));
  }
  req.user = user;
  next();
});
