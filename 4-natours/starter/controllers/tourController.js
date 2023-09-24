const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

// creating param middleware, to check id ID is valid
exports.checkID = (req, res, next, val) => {
  console.log(`MIMDDLEWARE checkID=${val}`);
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log('MIMDDLEWARE checkBody');
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  }
  next();
};

// Route handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    requested: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === Number(req.params.id));
  // if tour od given id doesnt exist = send error
  // if (!tour) {
  //   res.status(404).json({ status: 'fail', message: 'Invalid id' });
  // } else {
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
  // }
};

exports.createTour = (req, res) => {
  //   const newId = tours[tours.length - 1].id + 1;
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.updateTour = (req, res) => {
  // if (Number(req.params.id) > tours.length) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  // }
  const updatedTour = 'this is updated tour';
  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour,
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
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
