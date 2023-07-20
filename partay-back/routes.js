const express = require('express');
const { Op } = require('sequelize'); // Import de l'opérateur Op depuis Sequelize
const router = express.Router();
const Utilisateurs  = require('./models/utilisateurs'); // Import du modèle Utilisateur
const CodeErreur = require('./CodeErreur');
const { contrainteMotDePasse } = require('./tools');


// Define a route for the root URL
router.get('/test/', (req, res) => {
  return res.send('Connexion OK');
});

// Création d'un utilisateur
router.post('/utilisateur', async (req, res) => {
  console.log(req.body);
  const utilisateurInfos = {
    Mail: req.body.Mail,
    Telephone: req.body.Telephone,
    MotDePasse: req.body.MotDePasse,
    Pseudo: req.body.Pseudo,
    DateNaissance: req.body.DateNaissance,
    Prenom: req.body.Prenom,
    Nom: req.body.Nom,
  };

  try {
    // Vérification des paramètres obligatoires
    if (!utilisateurInfos.Prenom || !utilisateurInfos.Nom || !(utilisateurInfos.Mail && utilisateurInfos.Telephone) || !utilisateurInfos.MotDePasse) {
      return res.status(400).json({erreur: CodeErreur.PARAM_MANQUANT});
    }

    // Vérification de la taille des paramètres
    for (const [field, value] of Object.entries(utilisateurInfos)) {
      if (value && value.length > 50) {
        return res.status(400).json({ erreur: CodeErreur.PARAM_LONGUEUR });
      }
    }

    // Vérification des contraintes de mot de passe
    const motDePasseValide = contrainteMotDePasse(utilisateurInfos.MotDePasse);
    if (motDePasseValide !== true) {
      return res.status(400).json({erreur: motDePasseValide});
    }

    // Vérification de l'unicité du Mail
    const existingUserMail = await Utilisateurs.findOne({ where: { Mail: utilisateurInfos.Mail } });
    if (existingUserMail) {
      return res.status(409).json({erreur: CodeErreur.UNIQUE_EMAIL});
    }

    // Vérification de l'unicité du Téléphone
    if (utilisateurInfos.Telephone) {
      const existingUserTelephone = await Utilisateurs.findOne({ where: { Telephone: utilisateurInfos.Telephone } });
      if (existingUserTelephone) {
        return res.status(409).json({erreur: CodeErreur.UNIQUE_TELEPHONE});
      }
    }

    const newUser = await Utilisateurs.create({
      Mail: utilisateurInfos.Mail,
      Telephone: utilisateurInfos.Telephone,
      MotDePasse: utilisateurInfos.MotDePasse,
      Pseudo: utilisateurInfos.Pseudo,
      DateNaissance: utilisateurInfos.DateNaissance,
      Prenom: utilisateurInfos.Prenom,
      Nom: utilisateurInfos.Nom,
      DerniereConnexion: new Date(),
    });

    const message = 'Inscription réussie : ' + newUser.Id_Utilisateur;

    console.log(message);
    return res.status(201).json({ message: message });
  } catch (error) {
    console.error('Error inserting user:', error);
    return res.status(500).json({erreur: CodeErreur.ERREUR_SERVEUR});
  }
});

// Connexion d'un utilisateur
router.post('/connexion', async (req, res) => {
  const { identifiant, motDePasse } = req.body;

  // Vérification des contraintes de la base de données
  if (!identifiant || !motDePasse) {
    return res.status(400).json({ erreur: CodeErreur.PARAM_MANQUANT });
  }

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
      return res.status(401).json({ erreur: CodeErreur.IDENTIFIANTS_INVALIDES });
    }

    // Mise à jour de la propriété DerniereConnexion
    user.DerniereConnexion = new Date();

    // Enregistrement des modifications dans la base de données
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({erreur: CodeErreur.ERREUR_SERVEUR});
  }
});

// Export the router instance
module.exports = router;
