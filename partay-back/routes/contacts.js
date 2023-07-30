const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Utilisateurs, Contacts } = require('../models');

const CodeErreur = require('../erreurs/CodeErreur');

// Ajout ou modification d'un contact pour un utilisateur donné
router.post('/ajout', async (req, res) => {
  const { Id_Utilisateur, Id_Utilisateur_Contact, Mail, Telephone, Prenom, Nom, Pseudo, DateNaissance } = req.body;

  // Vérifier si l'utilisateur existe
  const utilisateur = await Utilisateurs.findByPk(Id_Utilisateur);
  if (!utilisateur) {
    return res.status(404).json({ erreur: CodeErreur.CONTACT_INCONNU });
  }

  if (!Id_Utilisateur_Contact && !Mail && !Telephone) {
    return res.status(404).json({ erreur: CodeErreur.CONTACT_IDENTIFIANT });
  }

  var newContactData;
  var existingContact;

  if (Id_Utilisateur_Contact) {
    newContactData = {
      Id_Utilisateur: Id_Utilisateur,
      Id_Utilisateur_Contact: Id_Utilisateur_Contact,
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
        Id_Utilisateur_Contact: Id_Utilisateur_Contact
      }
    })

  } else {
    newContactData = {
      Id_Utilisateur: Id_Utilisateur,
      Id_Utilisateur_Contact: null,
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

router.delete('/suppression/:id_contact', async (req, res) => {
  const Id_Contact = req.params.id_contact; // Récupérer l'ID du contact à supprimer

  try {
    // Vérifier si le contact existe avant de le supprimer
    const contactExiste = await Contacts.findByPk(Id_Contact);
    if (!contactExiste) {
      return res.status(404).json({ erreur: CodeErreur.CONTACT_INCONNU });
    }

    // Effectuer la suppression du contact
    await Contacts.destroy({
      where: { Id_Contact: Id_Contact }
    });

    const message = 'Suppression du contact réussie pour l\'ID : ' + Id_Contact;
    console.log(message);

    return res.status(200).json({ message: message });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Récupération de la liste de contacts d'un utilisateur
router.get('/:id_utilisateur', async (req, res) => {
  const Id_Utilisateur = req.params.id_utilisateur;

  try {
    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateurs.findByPk(Id_Utilisateur);

    if (!utilisateur) {
      return res.status(404).json({ erreur: CodeErreur.CONTACT_INCONNU });
    }
    
    const contacts = await Contacts.findAll({ where: { Id_Utilisateur: Id_Utilisateur } });
    const infosContacts = [];

    for (const contact of contacts) {
      const utilisateur_contact = await Utilisateurs.findByPk(contact.Id_Contact);
      
      if (utilisateur_contact) {
        infosContacts.push({
          Id_Contact: contact.Id_Contact,
          Id_Utilisateur: utilisateur_contact.Id_Utilisateur,
          Mail: utilisateur_contact.Mail,
          Telephone: utilisateur_contact.Telephone,
          Pseudo: utilisateur_contact.Pseudo,
          Nom: utilisateur_contact.Nom,
          Prenom: utilisateur_contact.Prenom,
          DateNaissance: utilisateur_contact.DateNaissance,
          DateContact: contact.DateAjout
        });
      } else {
        infosContacts.push({
          Id_Contact: contact.Id_Contact,
          Id_Utilisateur: contact.Id_Utilisateur,
          Mail: contact.Mail,
          Telephone: contact.Telephone,
          Pseudo: contact.Pseudo,
          Nom: contact.Nom,
          Prenom: contact.Prenom,
          DateNaissance: contact.DateNaissance,
          DateContact: contact.DateAjout
        })
      }
    }

    return res.status(200).json(infosContacts);
  } catch (error) {
    
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

module.exports = router;
