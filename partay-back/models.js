const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Utilisateurs = sequelize.define('Utilisateurs', {
  Id_Utilisateur: {
    type: DataTypes.STRING(36),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  Prenom: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  MotDePasse: {
    type: DataTypes.STRING(50),
    allowNull: false
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
  Nom: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'DateInscription'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'DerniereConnexion'
  }
}, {
  tableName: 'Utilisateurs', // Nom de la table dans la base de données
});

module.exports = {
  Utilisateurs
};
