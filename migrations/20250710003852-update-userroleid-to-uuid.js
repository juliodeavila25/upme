'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'userRoleId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'UserRoles',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'userRoleId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'UserRoles',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};