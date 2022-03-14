// tourRoutes.js

const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);    //   param  (checkID from URL ,call at tourController.js), 

router
  .route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/tour-stats')
  .get(tourController.getTourStats);


router
  .route('/')
  .get(authController.protect, tourController.getAllTours)   // protect  getAllTours
  .post(tourController.createTour);


router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour);

module.exports = router;    
