const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// set security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// setting rate limit for 100 req na godzinę
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later.'
});
// use limiter tylko na ścieżce /api
app.use('/api', limiter);

// body parser, reading data from body into reg.body
// dla json() można podać options i dać np limit na ilość danych w body
app.use(express.json({ limit: '10kb' }));

// data sanitization against noSQL query injection
// generalnie usuwa $ i . z req.body req,string i req.params
app.use(mongoSanitize());

// data sanitization against XSS attacks
// zamienia kod html z req.body na html entities
app.use(xss());

// data sanitization - prevent parameter pollution
// zapobiega zdublowania zapytania z query, zostawia ostatni z parametrów
// jako options podajemy tablicę zmiennych które mogą się powtarzać
app.use(
  hpp({
    whiteList: [
      'duration',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// serving static files
app.use(express.static(`${__dirname}/public`));

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
