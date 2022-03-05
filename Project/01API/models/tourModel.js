const mongoose = require('mongoose');
const slugify = require('slugify');


const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true
  },

  slug: String,

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
  ratingsQuantity: {
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
},                                          // Virtual properties not path of DB, can't query 
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// create virtual properties use regular function not arrow function 
tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will save document.....');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

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

