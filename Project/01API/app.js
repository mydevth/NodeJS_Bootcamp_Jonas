// app.js

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');  //HTTP request logger middleware for node.js

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
  next();
});

// 2) HANDERS  - MOVE TO FILE

// 3) ROUTES /MOUNT   - SOMEMOVE TO FILE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`
  // });

  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});


// 4) START THE SERVER

module.exports = app;

