"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UpmeProjects", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      id_umpe: Sequelize.BIGINT,
      start_year: Sequelize.INTEGER,
      sic_code: Sequelize.STRING,
      resource_name: Sequelize.STRING,
      net_effective_capacity_mw: Sequelize.FLOAT,
      conversion_factor: Sequelize.FLOAT,
      is_small: Sequelize.STRING,
      dispatch_type: Sequelize.STRING,
      default_fuel: Sequelize.STRING,
      operation_date: Sequelize.BIGINT,
      representative_agent: Sequelize.STRING,
      resource_status: Sequelize.STRING,
      generation_type: Sequelize.STRING,
      classification: Sequelize.STRING,
      date: Sequelize.BIGINT,
      official_municipality: Sequelize.STRING,
      municipality_code: Sequelize.STRING,
      official_department: Sequelize.STRING,
      latitude: Sequelize.DOUBLE,
      longitude: Sequelize.DOUBLE,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UpmeProjects");
  },
};
