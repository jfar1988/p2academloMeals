const bcrypt = require('bcryptjs');
const appError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const generateJWT = require('../helpers/jwt');
const User = require('../models/users.model');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'admin' } = req.body;

  const user = new User({
    name,
    email: email.toLowerCase(),
    password,
    role,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();
  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'successs',
    message: 'The user has been created correctly',
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (!user) {
    return next(new appError('Incorrect email or password!', 401));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new appError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'Success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.renewToken = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;

  const token = await generateJWT(id);

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  return res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
