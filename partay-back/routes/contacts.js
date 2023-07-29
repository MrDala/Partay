const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const Utilisateurs = require('../models/Utilisateurs');
const Contacts = require('../models/Contacts');

const CodeErreur = require('../erreurs/CodeErreur');

// Ajout ou modification d'un contact pour un utilisateur donné
router.post('/ajout', async (req, res) => {
  const { Id_Utilisateur, Id_Contact, Mail, Telephone, Prenom, Nom, Pseudo, DateNaissance } = req.body;

  // Vérifier si l'utilisateur existe
  const utilisateur = await Utilisateurs.findByPk(Id_Utilisateur);
  if (!utilisateur) {
    return res.status(404).json({ erreur: CodeErreur.CONTACT_INCONNU });
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

router.delete('/suppression/:id', async (req, res) => {
  const contactId = req.params.id; // Récupérer l'ID du contact à supprimer

  try {
    // Vérifier si le contact existe avant de le supprimer
    const contactExiste = await Contacts.findByPk(contactId);
    if (!contactExiste) {
      return res.status(404).json({ erreur: CodeErreur.CONTACT_INCONNU });
    }

    // Effectuer la suppression du contact
    await Contacts.destroy({
      where: { Id_Contact: contactId }
    });

    const message = 'Suppression du contact réussie pour l\'ID : ' + contactId;
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

module.exports = router;
