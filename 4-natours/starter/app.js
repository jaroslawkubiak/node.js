const morgan = require('morgan');
// importing express
const express = require('express');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// creating app
const app = express();
// 1) MIDDLEWARES
console.log(`You are on ${process.env.NODE_ENV}`);
// run this only in development env
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());

//serving static files
app.use(express.static(`${__dirname}/public`));

// // creating our own middleware
// // all middleware func have access to req i res object and to next()
// app.use((req, res, next) => {
//   console.log('FIRST MIDDLEWARE');
//   // musimy ZAWSZE wykonać next()
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
module.exports = app;
