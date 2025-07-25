'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('UpmeProjects', 'Projects');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('Projects', 'UpmeProjects');
  }
};