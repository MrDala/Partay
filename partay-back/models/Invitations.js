const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Utilisateurs = require('./Utilisateurs');
const Evenements = require('./Evenements');

const Invitations = sequelize.define('Invitations', {
  Id_Utilisateur: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    allowNull: false,
    references: {
      model: Utilisateurs,
      key: 'Id_Utilisateur',
    },
  },
  Id_Evenement: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    allowNull: false,
    references: {
      model: Evenements,
      key: 'Id_Evenements',
    },
  },
  Reponse: {
    type: DataTypes.BOOLEAN,
  },
  DateInvitation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  DateModification: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Invitations;
