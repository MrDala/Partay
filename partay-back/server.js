const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const routes = require('./routes');
const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from http://localhost:3001
  optionsSuccessStatus: 200 // Set the status code for successful preflight requests to 200
}));

// Sequelize database configuration
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

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
const { UTILISATEUR } = require('./models');

// Définition des associations entre les modèles si nécessaire
// Exemple : Utilisateur.hasMany(AutreModele);

app.use((req, res, next) => {
  req.db = {
    UTILISATEUR // Passer les modèles à req.db pour pouvoir les utiliser dans les routes
  };
  next();
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});

// Configure your routes here
app.use('/api', routes);
