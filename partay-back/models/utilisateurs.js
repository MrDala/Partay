const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../sequelize');

const Utilisateurs = sequelize.define('Utilisateurs', {
  Id_Utilisateur: {
    type: DataTypes.STRING(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  Mail: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  Telephone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true
  },
  MotDePasse: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Prenom: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Nom: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Pseudo: {
    type: DataTypes.STRING(14),
    allowNull: false
  },
  DateNaissance: {
    type: DataTypes.DATE,
    allowNull: false
  },
  DateInscription: {
    type: DataTypes.DATE,
    defaultValue: new Date,
    allowNull: false
  },
  DerniereConnexion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'Utilisateurs'
});

module.exports = Utilisateurs;