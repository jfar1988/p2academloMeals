const { Router } = require('express');
const { createMeals } = require('../controllers/meals.controller');
const { validateFields } = require('../middlewares/validateField.middlewares');
const {
  createMealsValidation,
} = require('../middlewares/validations.middleware');

const router = Router();

router.post('/:id', createMealsValidation, validateFields, createMeals);

module.exports = {
  mealsRouter: router,
};
