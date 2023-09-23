const fs = require('fs');

// importing express
const express = require('express');
// creating app
const app = express();

// adding middleware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET request for tours
// ten callback nazywamy route handler
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

// GET - get info about specified tour
app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === Number(req.params.id));

  // if tour od given id doesnt exist = send error
  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Invalid id' });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
});

// POST request to create new tour
app.post('/api/v1/tours', (req, res) => {
  //   const newId = tours[tours.length - 1].id + 1;
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// PATCH - update tour info
app.patch('/api/v1/tours/:id', (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  const updatedTour = 'this is updated tour';
  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour,
    },
  });
});

// DELETE tour by id
app.delete('/api/v1/tours/:id', (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 3000;
// starting server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
