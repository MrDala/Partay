const express = require('express');
const router = express.Router();

router.get('/connexion', (req, res) => {
  return res.send('Connexion OK');
});

module.exports = router;
