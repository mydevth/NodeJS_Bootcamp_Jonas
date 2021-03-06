const fs = require('fs');
const express = require('express');
const res = require('express/lib/response');

const app = express();

// basic midleware (between request and response)
app.use(express.json());


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
}


const getTour = (req, res) => {
  // console.log(req.params);     //  req.params is function read url parameter ,etc= { id: '5' }
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // if (id > tours.length) {     // find incorrect input ID  Sol-1
  if (!tour) {                    // find incorrect input ID  Sol-2
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour            // tours: tour    
    }
  });
}

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
}

const updateTour = (req, res) => {

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here......>'
    }
  });
}

const deleteTour = (req, res) => {

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
}

// Modify 1 เอา callback function ไปตั้งเป็นตัวแปรด้านบนแล้วเรียกใช้
// app.get('/api/v1/tours', getAllTours );    // get = read
// app.get('/api/v1/tours/:id', getTour);     // read by ID  
// app.post('/api/v1/tours', createTour );      // post = create new 
// app.patch('/api/v1/tours/:id', updateTour );  // patch = update data
// app.delete('/api/v1/tours/:id', deleteTour);  // delete data

// Modify 2 เปลี่ยนเป็นใช้ route 
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);



const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});