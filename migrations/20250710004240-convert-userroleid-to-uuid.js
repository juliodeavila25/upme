"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Users", "Users_userRoleId_fkey");

    await queryInterface.changeColumn("Users", "userRoleId", {
      type: Sequelize.UUID,
      allowNull: true,
    });

    await queryInterface.addConstraint("Users", {
      fields: ["userRoleId"],
      type: "foreign key",
      name: "Users_userRoleId_fkey",
      references: {
        table: "UserRoles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Users", "Users_userRoleId_fkey");

    await queryInterface.changeColumn("Users", "userRoleId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addConstraint("Users", {
      fields: ["userRoleId"],
      type: "foreign key",
      name: "Users_userRoleId_fkey",
      references: {
        table: "UserRoles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
