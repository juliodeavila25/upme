module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define("UserRole", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  });

  UserRole.associate = (models) => {
    UserRole.hasMany(models.User, { foreignKey: "userRoleId" });
  };

  return UserRole;
};
