const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/users.model');
const bcrypt = require('bcryptjs');

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

exports.validIfExistUserEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (user && !user.status) {
    return next(
      new appError(
        'The user has an account, but it is deactivated please talk to the administrator to activate it',
        400
      )
    );
  }

  if (user) {
    return next(new appError('The email user already exists', 400));
  }

  next();
});

exports.validPassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new appError('Invalid username or password!', 401));
  }
  next();
});
