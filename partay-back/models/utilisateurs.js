const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const CodeErreur = require('../CodeErreur');
const { contrainteMotDePasse } = require('../tools');

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
      msg: CodeErreur.EMAIL_UNIQUE
    },
    isEitherMailOrTelephone(value) {
      const emailReg = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
      );

      if (!value && !this.Telephone) {
        throw new Error(CodeErreur.IDENTIFIANT_MANQUANT);
      } else if (value && !emailReg.test(value)) {
        throw new Error(CodeErreur.EMAIL_FORMAT)
      }
    },
    isNotTooLong(value) {
      if (value.length > 50) {
        throw new Error(CodeErreur.PARAM_LONGUEUR);
      }
    }
  },
  Telephone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: {
      msg: CodeErreur.TELEPHONE_UNIQUE
    },
    isEitherMailOrTelephone(value) {
      if (!value && !this.Mail) {
        throw new Error('Au moins une adresse mail ou un numéro de téléphone doit être renseigné.');
      }
    },
    isNotTooLong(value) {
      if (value.length > 50) {
        throw new Error(CodeErreur.PARAM_LONGUEUR);
      }
    }
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
        if (value.length > 14) {
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
        if (value.length > 50) {
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
        if (value.length > 50) {
          throw new Error(CodeErreur.PARAM_LONGUEUR);
        }
      }
    }
  }
});

module.exports = Utilisateurs;


module.exports = Utilisateurs;
