const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Utilisateurs } = require('../models');

const CodeErreur = require('../erreurs/CodeErreur');

// Création d'un utilisateur
router.post('/ajout', async (req, res) => {
  const {Mail, Telephone, MotDePasse, Pseudo, DateNaissance, Prenom, Nom} = req.body;
  try {
    const newUser = await Utilisateurs.create({
      Mail: Mail,
      Telephone: Telephone,
      MotDePasse: MotDePasse,
      Pseudo: Pseudo,
      DateNaissance: DateNaissance,
      Prenom: Prenom,
      Nom: Nom,
      DerniereConnexion: new Date(),
    });

    const message = 'Inscription réussie : ' + newUser.Id_Utilisateur;

    console.log(message);

    return res.status(201).json({ message: message });
  } catch (error) {
    console.error('Error inserting user:', error);

    if (error.name === 'SequelizeValidationError') {
      const errorMessage = error.errors[0].message;
      return res.status(400).json({ erreur: errorMessage });

    } else if (error.name === 'SequelizeUniqueConstraintError') {
      const errorMessage = error.errors[0].message;
      return res.status(409).json({ erreur: errorMessage });

    }
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Modifier le compte d'un utilisateur
router.put('/modification/:id_utilisateur', async (req, res) => {
  const userId = req.params.id_utilisateur;
  const { Mail, Telephone, MotDePasse, Pseudo, DateNaissance, Prenom, Nom } = req.body;

  try {
    // Vérifier si l'utilisateur existe avant de tenter la modification
    const utilisateurExiste = await Utilisateurs.findByPk(userId);
    if (!utilisateurExiste) {
      return res.status(404).json({ erreur: CodeErreur.UTILISATEUR_INCONNU });
    }

    // Effectuer la modification de l'utilisateur
    await Utilisateurs.update({
      Mail: Mail,
      Telephone: Telephone,
      MotDePasse: MotDePasse,
      Pseudo: Pseudo,
      DateNaissance: DateNaissance,
      Prenom: Prenom,
      Nom: Nom,
      DerniereConnexion: new Date(),
    }, {
      where: { Id_Utilisateur: userId }
    });

    const message = 'Modification de l\'utilisateur réussie pour l\'ID : ' + userId;
    console.log(message);

    return res.status(200).json({ message: message });
  } catch (error) {
    console.error('Error updating user:', error);

    if (error.name === 'SequelizeValidationError') {
      const errorMessage = error.errors[0].message;
      return res.status(400).json({ erreur: errorMessage });

    } else if (error.name === 'SequelizeUniqueConstraintError') {
      const errorMessage = error.errors[0].message;
      return res.status(409).json({ erreur: errorMessage });

    }
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Suppression d'un compte utilisateur
router.delete('/suppression/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Vérifier si l'utilisateur existe avant de le supprimer
    const utilisateurExiste = await Utilisateurs.findByPk(userId);
    if (!utilisateurExiste) {
      return res.status(404).json({ erreur: CodeErreur.UTILISATEUR_INCONNU });
    }

    // Effectuer la suppression de l'utilisateur
    await Utilisateurs.destroy({
      where: { Id_Utilisateur: userId }
    });

    const message = 'Suppression de l\'utilisateur réussie pour l\'ID : ' + userId;
    console.log(message);

    return res.status(200).json({ message: message });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
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
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

module.exports = router;