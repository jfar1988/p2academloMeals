const Order = require('./orders.model');
const user = require('./users.model');
const Review = require('./reviews.model');
const Restaurant = require('./restaurants.model');
const Meal = require('./meals.model');

const initModel = () => {
  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasMany(Review);
  Review.belongsTo(User);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Meal);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};

module.exports = initModel;
