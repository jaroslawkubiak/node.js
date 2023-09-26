const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// connect to DB
mongoose.connect(DB).then(() => console.log('DB conn successful!'));

// read json file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//import data
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data data');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data delete');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
