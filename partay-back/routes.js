const express = require('express');
const { Op } = require('sequelize'); // Import de l'opérateur Op depuis Sequelize
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
    if (!Prenom || !MotDePasse || !Mail || !Nom) {
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
    if (Telephone) {
      const existingUserTelephone = await Utilisateurs.findOne({ where: { Telephone } });
      if (existingUserTelephone) {
        return res.status(409).json({ message: 'Un utilisateur avec ce numéro de téléphone existe déjà.' });
      }
    }

    const newUser = await Utilisateurs.create({
      Prenom,
      MotDePasse,
      Mail,
      Telephone,
      Nom,
      DateInscription: new Date(),
      DerniereConnexion: new Date()
    });

    console.log('New user inserted with ID:', newUser.Id_Utilisateur);
    return res.status(201).json({ message: 'User inserted successfully' });
  } catch (error) {
    console.error('Error inserting user:', error);
    return res.status(500).send('Internal Server Error');
  }
});


//Connexion d'un utilisateur
router.post('/connexion', async (req, res) => {
  const { identifiant, motDePasse } = req.body;

  try {
    // Vérification de l'identifiant et du mot de passe
    const user = await Utilisateurs.findOne({
      where: {
        [Op.or]: [
          { Mail: identifiant },
          { Telephone: identifiant }
        ],
        MotDePasse: motDePasse
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants de connexion invalides' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send('Internal Server Error');
  }
});

// Export the router instance
module.exports = router;
