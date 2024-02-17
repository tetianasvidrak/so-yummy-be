const express = require('express');
const recipes = require('../../controllers/recipes');
const { authenticate, upload } = require('../../middlewares');
const { validateFormDataBody } = require('../../decorators');
const { addRecipeSchema } = require('../../schemas');

const router = express.Router();

router.use(authenticate);

router.get('/category-list', recipes.getCategoryList);
router.get('/main-page', recipes.getRecipesOfMainPage);
router.delete('/ownRecipes/:id', recipes.deleteOwnRecipe);
router.get('/ownRecipes', recipes.getOwnRecipes);
router.put('/favorite/:id', recipes.addToFavoriteRecipes);
router.delete('/favorite/:id', recipes.deleteFromFavoriteRecipes);
router.get('/favorite', recipes.getFavoriteRecipes);
router.get('/category/:category', recipes.getRecipesByCategory);
router.get('/popular-recipe', recipes.getPopularRecipes);
router.get('/search', recipes.getRecipesByTitle);
router.get('/:id', recipes.getRecipesById);
router.post(
  '/ownRecipes',
  upload.single('recipeImg'),
  validateFormDataBody(addRecipeSchema),
  recipes.addOwnRecipe
);

module.exports = router;
