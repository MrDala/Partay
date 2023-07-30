'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ChampsPersonnalisables', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Id_Evenement: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'Evenements',
          key: 'Id_Evenement'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Id_Invite: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'Utilisateurs',
          key: 'Id_Utilisateur'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Clef: {
        type: Sequelize.ENUM('numerique', 'booleen', 'string'),
        allowNull: false,
      },
      DataType: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Valeur: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ChampsPersonnalisables');
  }
};
