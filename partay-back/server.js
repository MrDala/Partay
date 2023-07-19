const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const app = express();
const port = process.env.PORT;
const sequelize = require('./sequelize'); // Importez la constante sequelize depuis le fichier sequelize.js

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from http://localhost:3001
  optionsSuccessStatus: 200 // Set the status code for successful preflight requests to 200
}));

// Connect to MySQL database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

// Import des modèles
const { Utilisateurs } = require('./models');

app.use((req, res, next) => {
  req.db = {
    Utilisateurs
  };
  next();
});


app.listen(port, () => {
  console.log('Server is running on port 3000');
});

// Configure your routes here
app.use('/api', routes);
