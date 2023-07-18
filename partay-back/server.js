const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from http://localhost:3001
  optionsSuccessStatus: 200 // Set the status code for successful preflight requests to 200
}));

app.listen(port, () => {
  console.log('Server is running on port 3000');
});

// Configure your routes here
app.use('/api', routes);
