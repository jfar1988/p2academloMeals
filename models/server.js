const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { authRouter } = require('../routes/auth.routes');
const { usersRouter } = require('../routes/users.routes');
const { mealsRouter } = require('../routes/meals.routes');
const { restaurantRouter } = require('../routes/restaurants.routes');
const { ordersRouter } = require('../routes/orders.routes');
const initModel = require('./initModel');
const appError = require('../helpers/appError');
const morgan = require('morgan');
const globalErrorHandler = require('../controllers/error.controller');
const { reviewsRouter } = require('../routes/reviews.routes');

class Server {
  //1
  constructor() {
    this.app = express();

    this.port = process.env.PORT || 3000;

    //Path Routes
    this.path = {
      auth: '/api/v1/auth',
      user: '/api/v1/user',
      restaurant: '/api/v1/restaurant',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
      review: '/api/v1/reviews',
    };

    //Connect to db
    this.database();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  //2
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    if (process.env.NODE_ENV === 'develoment') {
      this.app.use(morgan('dev'));
    }
  }
  //3
  routes() {
    this.app.use(this.path.auth, authRouter);
    this.app.use(this.path.user, usersRouter);
    this.app.use(this.path.restaurant, restaurantRouter);
    this.app.use(this.path.meal, mealsRouter);
    this.app.use(this.path.order, ordersRouter);
    this.app.use(this.path.review, reviewsRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new appError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }
  //4
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    //relations
    initModel();

    db.sync() //{force:true}
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  //5
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Por', this.port);
    });
  }
}

module.exports = Server;
