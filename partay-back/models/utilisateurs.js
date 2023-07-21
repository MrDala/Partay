const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const CodeErreur = require('../CodeErreur');
const { contrainteMotDePasse, transformEmptyStringToNull } = require('../tools');

const Utilisateurs = sequelize.define('Utilisateurs', {
  Id_Utilisateur: {
    type: DataTypes.STRING(36),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  Mail: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: {
      msg: CodeErreur.UNIQUE_EMAIL,
    },
    validate: {
      isEitherMailOrTelephone() {
        if (!this.Mail && !this.Telephone) {
          throw new Error(CodeErreur.IDENTIFIANT_MANQUANT);
        }
      },
      isEmailIfMailProvided() {
        if (this.Mail && !/^.+@.+\..+$/.test(this.Mail)) {
          throw new Error(CodeErreur.EMAIL_FORMAT);
        }
      },
      isNotTooLong(value) {
        if (value && value.length > 50) {
          throw new Error(CodeErreur.PARAM_LONGUEUR);
        }
      },
    },
  },
  Telephone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: {
      msg: CodeErreur.TELEPHONE_UNIQUE,
    },
    validate(value) {
      if (!value && !this.Mail) {
        throw new Error(CodeErreur.IDENTIFIANT_MANQUANT);
      }
      if (value && value.length > 50) {
        throw new Error(CodeErreur.PARAM_LONGUEUR);
      }
    },
  },
  MotDePasse: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isValidPassword(value) {
        const validationError = contrainteMotDePasse(value);
        
        if (validationError !== true) {
          throw new Error(validationError);
        }
      }
    }
  },
  Pseudo: {
    type: DataTypes.STRING(14),
    allowNull: false,
    validate: {
      isNotTooLong(value) {
        if (value && value.length > 14) {
          throw new Error(CodeErreur.PSEUDO_LONGUEUR);
        }
      }
    }
  },
  DateNaissance: {
    type: DataTypes.DATE,
    allowNull: false
  },
  DateInscription: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  DerniereConnexion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Prenom: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isNotTooLong(value) {
        if (value && value.length > 50) {
          throw new Error(CodeErreur.PARAM_LONGUEUR);
        }
      }
    }
  },
  Nom: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isNotTooLong(value) {
        if (value && value.length > 50) {
          throw new Error(CodeErreur.PARAM_LONGUEUR);
        }
      }
    }
  }
},
{
  hooks: {
    beforeValidate: (utilisateur) => {
      utilisateur.set(transformEmptyStringToNull(utilisateur.dataValues));
    },
  },
});

module.exports = Utilisateurs;