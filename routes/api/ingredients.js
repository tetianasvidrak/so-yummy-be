const express = require('express');
const ingredients = require('../../controllers/ingredients');
const { authenticate } = require('../../middlewares');

const router = express.Router();
router.use(authenticate);

router.get('/list', ingredients.getIngredientsList);
router.post('/shopping-list/add-ingredient', ingredients.addToShoppingList);
router.post('/shopping-list/remove-ingredient',ingredients.removeFromShoppingList);
router.get('/shopping-list', ingredients.getShoppingList);
router.get('/', ingredients.getRecipesByIngredient);

module.exports = router;
