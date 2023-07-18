// routes.js
const express = require('express');
const router = express.Router();

// Define a route for the root URL
router.get('/test/', (req, res) => {
  return res.send('Connexion OK');
});

// Export the router instance
module.exports = router;
