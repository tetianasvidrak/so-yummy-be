const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

const recipesRouters = require('./routes/api/recipes');
const recipesIngredients = require('./routes/api/ingredients');
const userAuthRouters = require('./routes/api/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/so-yummy/recipes', recipesRouters);
app.use('/so-yummy/ingredients', recipesIngredients);
app.use('/so-yummy/users', userAuthRouters);

app.use(
  '/so-yummy/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({
    message,
  });
});

module.exports = app;
