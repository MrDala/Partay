const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const CodeErreur = require('../CodeErreur');
const { transformEmptyStringToNull } = require('../tools');
const Utilisateurs = require('./Utilisateurs'); 

const Contacts = sequelize.define('Contacts', {
  Id_Utilisateur: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true,
    references: {
      model: Utilisateurs,
      key: 'Id_Utilisateur',
    },
  },
  Id_Contact: {
    type: DataTypes.STRING(36),
    allowNull: true,
  },
  Mail: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Telephone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Prenom: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Nom: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Pseudo: {
    type: DataTypes.STRING(14),
    allowNull: true,
  },
  DateNaissance: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  DateAjout: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  hooks: {
    beforeValidate: (contact) => {
      contact.set(transformEmptyStringToNull(contact.dataValues));

      if (!contact.Id_Contact) {
        if (!contact.Mail && !contact.Telephone) {
          throw new Error(CodeErreur.CONTACT_IDENTIFIANT);
        }

        if (!contact.Prenom && !contact.Pseudo) {
          throw new Error(CodeErreur.CONTACT_COMMUNICATION);
        }
      }
    }
  }
});

module.exports = Contacts;
