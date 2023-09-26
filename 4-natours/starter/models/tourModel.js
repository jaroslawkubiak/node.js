const mongoose = require('mongoose');

// creatng schema - to describe and validate
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name🧨'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration🧨'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size🧨'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty🧨'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price🧨'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    require: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    require: [true, 'A tour must have a image cover'],
  },
  images: [String],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// creating model from schema (coś jak class z JS)
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
