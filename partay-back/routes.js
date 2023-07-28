const express = require('express');
const { Op } = require('sequelize'); // Import de l'opérateur Op depuis Sequelize
const router = express.Router();

const Utilisateurs = require('./models/Utilisateurs');
const Contacts = require('./models/contact');
const CodeErreur = require('./CodeErreur');

// Define a route for the root URL
router.get('/test/', (req, res) => {
  return res.send('Connexion OK');
});

// Création d'un utilisateur
router.post('/utilisateur', async (req, res) => {
  console.log(req.body);

  try {
    const newUser = await Utilisateurs.create({
      Mail: req.body.Mail,
      Telephone: req.body.Telephone,
      MotDePasse: req.body.MotDePasse,
      Pseudo: req.body.Pseudo,
      DateNaissance: req.body.DateNaissance,
      Prenom: req.body.Prenom,
      Nom: req.body.Nom,
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

// Récupération de la liste de contacts d'un utilisateur
router.get('/contacts/:id_utilisateur', async (req, res) => {
  const Id_Utilisateur = req.params.id_utilisateur;

  try {
    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateurs.findByPk(Id_Utilisateur);
    if (!utilisateur) {
      return res.status(404).json({ erreur: CodeErreur.UTILISATEUR_NON_TROUVE });
    }
    
    const contacts = await Contacts.findAll({ where: { Id_Utilisateur: Id_Utilisateur } });
    const infosContacts = [];

    for (const contact of contacts) {
      const infoContact = await Utilisateurs.findByPk(contact.Id_Contact);
      
      if (infoContact) {
        infosContacts.push({
          Id_Conctact: infoContact.Id_Utilisateur,
          Mail: infoContact.Mail,
          Telephone: infoContact.Telephone,
          Pseudo: infoContact.Pseudo,
          Nom: infoContact.Nom,
          Prenom: infoContact.Prenom,
          DateNaissance: infoContact.DateNaissance,
          DateContact: contact.DateAjout
        });
      }
    }

    return res.status(200).json(infosContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Ajout ou modification d'un contact pour un utilisateur donné
router.post('/contacts/ajout', async (req, res) => {
  const { Id_Utilisateur, Id_Contact, Mail, Telephone, Prenom, Nom, Pseudo, DateNaissance } = req.body;

  // Vérifier si l'utilisateur existe
  const utilisateur = await Utilisateurs.findByPk(Id_Utilisateur);
  if (!utilisateur) {
    return res.status(404).json({ erreur: CodeErreur.UTILISATEUR_NON_TROUVE });
  }

  if (!Id_Contact && !Mail && !Telephone) {
    return res.status(404).json({ erreur: CodeErreur.CONTACT_IDENTIFIANT });
  }

  var newContactData;
  var existingContact;

  if (Id_Contact) {
    newContactData = {
      Id_Utilisateur: Id_Utilisateur,
      Id_Contact: Id_Contact,
      Mail: null,
      Telephone: null,
      Prenom: null,
      Nom: null,
      Pseudo: null,
      DateNaissance: null
    };

    existingContact = await Contacts.findOne({
      where : {
        Id_Utilisateur: Id_Utilisateur,
        Id_Contact: Id_Contact
      }
    })

  } else {
    newContactData = {
      Id_Utilisateur: Id_Utilisateur,
      Id_Contact: null,
      Mail: Mail,
      Telephone: Telephone,
      Prenom: Prenom,
      Nom: Nom,
      Pseudo: Pseudo,
      DateNaissance: DateNaissance
    };

    existingContact = await Contacts.findOne({ 
      where: { 
        [Op.or]: [
          { Mail: Mail },
          { Telephone: Telephone }
        ]
      } 
    });
  }

  var contact;
  var statusCode;

  if (existingContact) {
    contact = await existingContact.update(newContactData);
    statusCode = 200;
  } else {
    contact = await Contacts.create(newContactData);
    statusCode = 201;
  }

  return res.status(statusCode).json(contact);
});


// Export the router instance
module.exports = router;
