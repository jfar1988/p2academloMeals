const { Router } = require('express');
const {
  createMeals,
  findMeals,
  findMealsForId,
  deleteMeal,
  updateMeal,
} = require('../controllers/meals.controller');
const { findOneMeal } = require('../middlewares/findOneMeal');
const { validateFields } = require('../middlewares/validateField.middlewares');
const {
  createMealsValidation,
} = require('../middlewares/validations.middleware');

const router = Router();

router.post('/:id', createMealsValidation, validateFields, createMeals);

router.get('/', findMeals);

router.get('/:id', findOneMeal, findMealsForId);

router.patch('/:id', findOneMeal, updateMeal);

router.delete('/:id', findOneMeal, deleteMeal);

module.exports = {
  mealsRouter: router,
};
