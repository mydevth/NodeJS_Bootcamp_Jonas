// file run for import - delete
// node dev-data/data/import-dev-data.js --delete
// node dev-data/data/import-dev-data.js --import 

const fs = require('fs');
const mongoose = require('mongoose');

const Tour = require('./../../models/tourModel');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });   //read config file config.env

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {       //  connect toLocal DB
  .connect(DB, {                                  //  connect ot Cloud DB (Atlas)
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(() => console.log('DB connection successful!'));

// READING THE JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');

  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Successfully DELETED!!!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// console.log(process.argv)
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}

