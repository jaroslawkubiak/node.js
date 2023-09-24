const morgan = require('morgan');
// importing express
const express = require('express');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// creating app
const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
// creating our own middleware
// all middleware func have access to req i res object and to next()
app.use((req, res, next) => {
  console.log('log middleware');
  // musimy ZAWSZE wykonać next()
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
