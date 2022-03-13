// app.js
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');  //HTTP request logger middleware for node.js
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//   import routes file
const tourRouter = require('./routes/tourRoutes');    // no need .js
const userRouter = require('./routes/userRoutes');    // no need .js

const app = express();

// 1) MIDDLEWARE (between request and response)
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));  // serving static files

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);

  next();
});

// 2) HANDERS  - MOVE TO FILE

// 3) ROUTES /MOUNT   - SOMEMOVE TO FILE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// 4) START THE SERVER
module.exports = app;

