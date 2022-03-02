//  tourController.js

const Tour = require('./../models/tourModel');

// 2) ROUTE HANDERS
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);

    // BUILD QUERY
    // 1A)   Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    // {difficulty:'easy', duration:{$gte:5}  }
    // { duration: { gte: '5' }, difficulty: 'easy' }
    // gte, gt, lte, lt

    // 2) Sorting
    console.log(`req.query.sort = ${req.query.sort}`);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3 Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select('name duration price');
    } else {
      query = query.select('-__v');
    }



    // EXECUTE QUERY
    const tours = await query;

    //  way 1 to do query  
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // });

    //  way 2 to do query  (use method)
    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Get All data fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})  //same above

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Get data fail',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour ({})
    // newTour.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Create fail',
      message: 'Invalid data sent!'
    })
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'Update fail',
      message: err
    });
  }
}

exports.deleteTour = async (req, res) => {
  try {
    // no const , not to send back any data to the client when there was a delete operation
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });

  } catch (err) {
    res.status(404).json({
      status: 'Delete fail',
      message: err
    });
  }
}


