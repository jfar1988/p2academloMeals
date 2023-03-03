const catchAsync = require('../helpers/catchAsync');
const Meal = require('../models/meals.model');

exports.createMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const meal = await Meal.create({ name, price, restaurantId: id });

  res.status(201).json({
    status: 'success',
    message: 'Meal created successfully',
    meal,
  });
});

exports.findMeals = catchAsync(async (req, res, next) => {
  const meal = await Meal.findAll({
    where: {
      status: 'active',
    },
  });
  res.status(201).json({
    status: 'success',
    message: 'Meals called successfully',
    meal,
  });
});
exports.findMealsForId = catchAsync(async (req, res, next) => {
  const { meal } = req;

  return res.status(201).json({
    status: 'SUCCESS',
    message: `meal was successfully brought`,
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  //Obtengo el id por parametro /:id
  const { name, price } = req.body;
  const { meal } = req;

  //cambia el status del reparacion seleccionado
  const updateMeal = await meal.update({ name, price });
  return res.status(201).json({
    status: 'SUCCESS',
    message: `the meal has been updated successfully`,
    updateMeal, //si quisieramos mostrar la reparacion completada
  });
});
exports.deleteMeal = catchAsync(async (req, res, next) => {
  //Obtengo el id por parametro /:id
  const { meal } = req;

  const deleteMeal = await meal.update({ status: 'inactive' });
  return res.status(201).json({
    status: 'SUCCESS',
    message: `the meal has been inactive successfully`,
    deleteMeal, //si quisieramos mostrar la reparacion completada
  });
});
