// const fs = require('fs');
const Tour = require('./../models/tourModel');

// Route handlers
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err });
  }
};

exports.getTour = async (req, res) => {
  try {
    // one way
    // Tour.find({_id: req.params.id})
    // findById to skrót do szukania po id
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err });
  }
  // const tour = tours.find((el) => el.id === Number(req.params.id));
  // // if tour od given id doesnt exist = send error
  // // if (!tour) {
  // //   res.status(404).json({ status: 'fail', message: 'Invalid id' });
  // // } else {
  // res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     tour,
  //   },
  // });
  // }
};

exports.createTour = async (req, res) => {
  // one way
  // const newTour = new Tour({});
  // newTour.save();

  // second way
  try {
    const newTour = await Tour.create(req.body); // Tour.create zwraca promise

    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err });
  }

  // if (Number(req.params.id) > tours.length) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  // }
  // const updatedTour = 'this is updated tour';
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: updatedTour,
  //   },
  // });
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err });
  }
};

// // one way
// // GET request for tours
// app.get('/api/v1/tours', getAllTours);
// // GET - get info about specified tour
// app.get('/api/v1/tours/:id', getTour);
// // POST request to create new tour
// app.post('/api/v1/tours', createTour);
// // PATCH - update tour info
// app.patch('/api/v1/tours/:id', updateTour);
// // DELETE tour by id
// app.delete('/api/v1/tours/:id', deleteTour);

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// creating param middleware, to check id ID is valid
// exports.checkID = (req, res, next, val) => {
//   console.log(`MIMDDLEWARE checkID=${val}`);
//   if (Number(req.params.id) > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   console.log('MIMDDLEWARE checkBody');
//   if (!req.body.name || !req.body.price) {
//     return res
//       .status(400)
//       .json({ status: 'fail', message: 'Missing name or price' });
//   }
//   next();
// };
