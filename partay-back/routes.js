const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { Utilisateurs } = require('./models'); // Import du modèle Utilisateur

// Define a route for the root URL
router.get('/test/', (req, res) => {
  return res.send('Connexion OK');
});

// Création d'un utilisateur
router.post('/utilisateur', async (req, res) => {
  const { Prenom, MotDePasse, Mail, Telephone, Nom } = req.body;

  try {
    // Vérification des contraintes de la base de données
    if (!Prenom || !MotDePasse || !Mail || !Telephone || !Nom) {
      return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires.' });
    }

    // Vérification des contraintes de mot de passe
    if (!/.{14,}/.test(MotDePasse)) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 14 caractères" });
    } else if (!/[A-Z]/.test(MotDePasse)) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 1 lettre majuscule" });
    } else if (!/[a-z]/.test(MotDePasse)) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 1 lettre minuscule" });
    } else if (!/[0-9]/.test(MotDePasse)) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 1 chiffre" });
    } else if (!/\W/.test(MotDePasse)) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 1 caractère spécial" });
    }


    // Vérification de l'unicité du Mail
    const existingUserMail = await Utilisateurs.findOne({ where: { Mail } });
    if (existingUserMail) {
      return res.status(409).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà.' });
    }

    // Vérification de l'unicité du Téléphone
    const existingUserTelephone = await Utilisateurs.findOne({ where: { Telephone } });
    if (existingUserTelephone) {
      return res.status(409).json({ message: 'Un utilisateur avec ce numéro de téléphone existe déjà.' });
    }

    // Autres vérifications des données, par exemple : longueur minimale/maximale, format d'e-mail, etc.

    const newUser = await Utilisateurs.create({
      Id_Utilisateur: uuidv4(),
      Prenom,
      MotDePasse,
      Mail,
      Telephone,
      Nom,
      DateInscription: new Date()
    });

    console.log('New user inserted with ID:', newUser.Id_Utilisateur);
    return res.status(201).json({ message: 'User inserted successfully' });
  } catch (error) {
    console.error('Error inserting user:', error);
    return res.status(500).send('Internal Server Error');
  }
});


// Export the router instance
module.exports = router;
