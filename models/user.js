module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userRoleId: {
      type: DataTypes.UUID,
      references: {
        model: "UserRoles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.UserRole, { foreignKey: "userRoleId" });
  };

  return User;
};
