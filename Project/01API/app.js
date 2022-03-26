// app.js
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');  //HTTP request logger middleware for node.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//   import routes file
const tourRouter = require('./routes/tourRoutes');    // no need .js
const userRouter = require('./routes/userRoutes');    // no need .js
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARE (between request and response)
// Set Security HTTP Headers
app.use(helmet());

// Development logging       /console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP,please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data brom body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization againt NoSQL query injection
app.use(mongoSanitize());

// Data sanitization againt XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));  // serving static files

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 2) HANDERS  - MOVE TO FILE

// 3) ROUTES /MOUNT   - SOMEMOVE TO FILE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// 4) START THE SERVER
module.exports = app;

