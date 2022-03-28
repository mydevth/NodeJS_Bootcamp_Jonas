const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = Model => catchAsync(async (req, res, next) => {

  // no const , not to send back any data to the client when there was a delete operation
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found widh thai ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
