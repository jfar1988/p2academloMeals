const Order = require('./orders.model');
const User = require('./users.model');
const Review = require('./reviews.model');
const Restaurant = require('./restaurants.model');
const Meal = require('./meals.model');

const initModel = () => {
  //1 a muchos
  User.hasMany(Order);
  Order.belongsTo(User);

  //1 a muchos
  User.hasMany(Review);
  Review.belongsTo(User);

  //1 a muchos
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  // 1 a muchos
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Meal);

  // 1 a 1
  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};

module.exports = initModel;
