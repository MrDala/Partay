const express = require('express');
const router = express.Router();

const CodeErreur = require('../erreurs/CodeErreur');
const Invitations = require('../models/Invitations');

// Création d'une invitation
router.post('/ajout', async (req, res) => {
  const {Id_Utilisateur, Id_Evenement, Reponse} = req.body;

  try {
    const invitation = await Invitations.create({
      Id_Utilisateur: Id_Utilisateur,
      Id_Evenement: Id_Evenement,
      Reponse: Reponse,
    });

    const message = 'Création de l\'invitation réussie : [' + invitation.Id_Evenement + " / " + invitation.Id_Utilisateur + "]";
    console.log(message);

    return res.status(201).json({ message: message });
  } catch (error) {
    console.error('Error inserting user:', error);

    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Modification de la réponse d'un utilisateur
router.put('/reponse/:id', async (req, res) => {
  const invitationId = req.params.id; // Récupérer l'ID de l'invitation à modifier
  const { Reponse } = req.body;

  try {
    // Vérifier si l'invitation existe avant de tenter la modification
    const invitationExiste = await Invitations.findByPk(invitationId);
    if (!invitationExiste) {
      return res.status(404).json({ erreur: CodeErreur.INVITATION_INCONNUE });
    }

    // Effectuer la mise à jour du champ Reponse de l'invitation
    await Invitations.update(
      { Reponse: Reponse },
      { where: { Id_Invitation: invitationId } }
    );

    const message = 'Mise à jour de la réponse de l\'invitation réussie pour l\'ID : ' + invitationId;
    console.log(message);

    return res.status(200).json({ message: message });
  } catch (error) {
    console.error('Error updating invitation:', error);

    if (error.name === 'SequelizeValidationError') {
      const errorMessage = error.errors[0].message;
      return res.status(400).json({ erreur: errorMessage });
    }

    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Suppression d'une invitation
router.delete('/suppression/:id', async (req, res) => {
  const invitationId = req.params.id; 

  try {
    // Vérifier si l'invitation existe avant de la supprimer
    const invitationExiste = await Invitations.findByPk(invitationId);
    if (!invitationExiste) {
      return res.status(404).json({ erreur: CodeErreur.INVITATION_INCONNUE });
    }

    // Effectuer la suppression de l'invitation
    await Invitations.destroy({
      where: { Id_Invitation: invitationId }
    });

    const message = 'Suppression de l\'invitation réussie pour l\'ID : ' + invitationId;
    console.log(message);

    return res.status(200).json({ message: message });
  } catch (error) {
    console.error('Error deleting invitation:', error);
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Récupère toutes les invitations relatives à un évènement
router.get('/:id_evenement', async (req, res) => {
  const Id_Evenement = req.params.id_evenement;

  try {
    const invitations = await Invitations.findAll({
      where: { Id_Evenement: Id_Evenement }
    });

    return res.status(200).json(invitations);
  } catch (error) {
    console.error('Error fetching invitations for event:', error);
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});


// Récupère toutes les invitations pour un utilisateur
router.get('/:id_utilisateur', async (req, res) => {
  const Id_Utilisateur = req.params.id_utilisateur;

  try {
    const invitations = await Invitations.findAll({
      where: { Id_Utilisateur: Id_Utilisateur }
    });

    return res.status(200).json(invitations);
  } catch (error) {
    console.error('Error fetching invitations for user:', error);
    return res.status(500).json({ error: CodeErreur.ERREUR_SERVEUR});
  }
});

module.exports = router;
