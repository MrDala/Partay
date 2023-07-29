const express = require('express');
const router = express.Router();

const Evenements = require('../models/Evenements');

const CodeErreur = require('../erreurs/CodeErreur');

// Création d'un évènement
router.post('/ajout', async (req, res) => {
  const {Organisateur, Nom, Presentation, Lieu, DateDebut, DateFin} = req.body;

  try {
    const newEvenement = await Evenements.create({
      Organisateur: Organisateur,
      Nom: Nom,
      Presentation: Presentation,
      Lieu: Lieu,
      DateDebut: DateDebut,
      DateFin: DateFin
    });

    const message = 'Création de l\'évènement réussi : ' + newEvenement.Id_Evenement;
    console.log(message);

    return res.status(201).json({ message: message });
  } catch (error) {
    console.error('Error inserting user:', error);

    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Mise à jour d'un évènement
router.put('/modification/:id', async (req, res) => {
  const eventId = req.params.id; // Récupérer l'ID de l'évènement à mettre à jour
  const { Organisateur, Nom, Presentation, Lieu, DateDebut, DateFin } = req.body;

  try {
    const evenementExiste = await Evenements.findByPk(eventId);
    if (!evenementExiste) {
      return res.status(404).json({ erreur: CodeErreur.EVENEMENT_INCONNU });
    }

    // Effectuer la mise à jour de l'évènement
    await Evenements.update({
      Organisateur: Organisateur,
      Nom: Nom,
      Presentation: Presentation,
      Lieu: Lieu,
      DateDebut: DateDebut,
      DateFin: DateFin
    }, {
      where: { Id_Evenement: eventId }
    });

    const message = 'Mise à jour de l\'évènement réussie pour l\'ID : ' + eventId;
    console.log(message);

    return res.status(200).json({ message: message });
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Suppression d'un évènement
router.delete('/suppression/:id', async (req, res) => {
  const eventId = req.params.id; // Récupérer l'ID de l'événement à supprimer

  try {
    // Vérifier si l'événement existe avant de le supprimer
    const evenementExiste = await Evenements.findByPk(eventId);
    if (!evenementExiste) {
      return res.status(404).json({ erreur: CodeErreur.EVENEMENT_INCONNU });
    }

    // Effectuer la suppression de l'événement
    await Evenements.destroy({
      where: { Id_Evenement: eventId }
    });

    const message = 'Suppression de l\'événement réussie pour l\'ID : ' + eventId;
    console.log(message);

    return res.status(200).json({ message: message });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Détail d'un évènement
router.put('/:id_evenement', async (req, res) => {
  const Id_Evenement = req.params.id_evenement;

  try {
    const evenement = await Evenements.findByPk(Id_Evenement);
    if (!evenement) {
      return res.status(404).json({ erreur: CodeErreur.EVENEMENT_INCONNU });
    }

    const invitations = await Invitations.findAll({
      where: {
        Id_Evenement: Id_Evenement
      }
    })

    const detailEvenement = {
      evenement,
      invitations
    }

    return res.status(200).json(detailEvenement);
    
  } catch (error) {
    console.error('Error inserting user:', error);

    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

// Liste des évènements organisés
router.get('/organisateur/:id_utilisateur', async (req, res) => {
  const Id_Utilisateur = req.params.id_utilisateur;

  try {
    const evenements = await Evenements.findAll({
      where: {
        Organisateur: Id_Utilisateur
      }
    });

    return res.status(200).json(evenements);
    
  } catch (error) {
    console.error('Error inserting user:', error);

    return res.status(500).json({ erreur: CodeErreur.ERREUR_SERVEUR });
  }
});

module.exports = router;
