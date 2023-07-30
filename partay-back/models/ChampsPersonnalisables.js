const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');
const CodeErreur = require('../erreurs/CodeErreur');

const { Utilisateurs } = require('./Utilisateurs');
const { Evenements } = require('./Evenements');

const TYPE_NUMERIQUE = 'numerique';
const TYPE_BOOLEEN = 'booleen';
const TYPE_TEXTE = 'string';

const ChampsPersonnalisables = sequelize.define('ChampsPersonnalisables', {
  Id_Evenement: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: Evenements,
      key: 'Id_Evenement'
    }
  },
  Id_Invite: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: Utilisateurs,
      key: 'Id_Utilisateur'
    },
  },
  Clef: {
    type: DataTypes.ENUM(TYPE_NUMERIQUE, TYPE_BOOLEEN, TYPE_TEXTE),
    allowNull: false
  },
  DataType: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Valeur: {
    type: DataTypes.TEXT,
    allowNull: true
  }
},{
  hooks: {
    beforeValidate: (champPersonnalisable) => {
      // Vérifier si DataType est défini et si Valeur correspond au type spécifié
      if (champPersonnalisable.DataType === TYPE_NUMERIQUE && isNaN(Number(champPersonnalisable.Valeur))) {
        throw new Error(CodeErreur.DATA_TYPE_NUMERIQUE);
      }
      if (champPersonnalisable.DataType === TYPE_BOOLEEN && typeof champPersonnalisable.Valeur !== TYPE_BOOLEEN) {
        throw new Error(CodeErreur.DATA_TYPE_BOOLEAN);
      }
      if (champPersonnalisable.DataType === TYPE_TEXTE && typeof champPersonnalisable.Valeur !== TYPE_TEXTE) {
        throw new Error(CodeErreur.DATA_TYPE_TEXTE);
      }
    }
  }
});

module.exports = ChampsPersonnalisables;
