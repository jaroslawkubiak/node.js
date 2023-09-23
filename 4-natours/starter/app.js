const fs = require('fs');

// importing express
const express = require('express');
// creating app
const app = express();

// adding middleware
app.use(express.json());

// creating our own middleware
// all middleware func have access to req i res object and to next()
app.use((req, res, next) => {
  console.log('log middleware');
  // musimy ZAWSZE wykonać next()
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requested: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

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

// second way - using route
// możemy łączyć kilka metod do jednego endpointa
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
// starting server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
