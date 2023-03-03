const catchAsync = require('../helpers/catchAsync');
const Order = require('../models/orders.model');

exports.findOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const order = await Order.findOne({
    where: {
      userId: sessionUser.id,
      id,
      status: 'active',
    },
  });
  req.order = order;
  next();
});
