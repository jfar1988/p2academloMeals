const catchAsync = require('../helpers/catchAsync');
const Order = require('../models/orders.model');
const User = require('../models/users.model');

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'The user correctly changed the name and email',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'Success',
    message: 'The user has been deleted successfully',
  });
});

//revisar
exports.getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const user = await User.findAll({
    include: [
      {
        model: Order,
        where: {
          userId: sessionUser.id,
          status: 'active',
        },
      },
    ],
  });

  res.status(200).json({
    user,
  });
});

// Sin revisar
exports.getOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;
  //TODO: acordarme de hacer esta mejora o esta refactorización
  const order = await Order.findOne({
    where: {
      userId: sessionUser.id,
      id,
      status: true,
    },
    include: [
      {
        model: Cart,
        where: {
          status: 'purchased',
        },
        include: [
          {
            model: ProductInCart,
            where: {
              status: 'purchased',
            },
          },
        ],
      },
    ],
  });
  res.status(200).json({
    order,
  });
});
