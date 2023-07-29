const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const sequelize = require('./sequelize'); // Importez la constante sequelize depuis le fichier sequelize.js

const routerTest = require('./routes/test');
const routerUtilisateurs = require('./routes/utilisateurs');
const routerContacts = require('./routes/contacts');
const routerEvenements = require('./routes/evenements');
const routerInvitations = require('./routes/invitations');

app.use('/test', routerTest);
app.use('/utilisateurs', routerUtilisateurs);
app.use('/contacts', routerContacts);
app.use('/evenements', routerEvenements);
app.use('/invitations', routerInvitations);

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
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

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
