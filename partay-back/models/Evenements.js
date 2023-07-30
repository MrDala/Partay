const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const Utilisateurs = require('./Utilisateurs');
const { transformEmptyStringToNull } = require('../tools');

const Evenements = sequelize.define('Evenement', {
  Id_Evenement: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    allowNull: false,
  },
  Organisateur: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: Utilisateurs,
      key: 'Id_Utilisateur',
    },
  },
  Nom: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Presentation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Lieu: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  DateDebut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  DateFin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  DateCreation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  DateModification: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  hooks: {
    beforeValidate: (evenement) => {
      evenement.set(transformEmptyStringToNull(evenement.dataValues));
    }
  }
});

module.exports = Evenements;
