const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    // enum: {
    //   values: ['easy', 'medium', 'difficult'],
    //   message: 'Difficulty is either: easy, medium, difficult'
    // }
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    require: [true, ' A tour must have a cover image']
  },
  images: [String],
  createAt: {
    type: Date,
    default: Date.now(),
    select: false                // hide createAt
  },
  startDates: [Date]
});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;


// const testTour = new Tour({
//   name: 'UTMB Tour',
//   price: 999
// });

// // save document to database
// testTour.save().then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log('ERROR 💔:', err)
// });

