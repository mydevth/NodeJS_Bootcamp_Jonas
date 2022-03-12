const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, ' Name is required'],
    trim: true,
    maxlength: [40, ' Name must have less or equal then 40 characters'],
    minlength: [3, 'Name must have more or equal then 3 characters']
  },
  email: {
    type: String,
    require: [true, ' Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Plase provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    require: [true, ' passowrd is required'],
    minlength: [8, 'Name must have more or equal then 8 characters']
  },
  conpassword: {
    type: String,
    require: [true, ' Comfirmed passowrd is required'],
  }
}
);


const User = mongoose.model('User', userSchema);

module.exports = User;
