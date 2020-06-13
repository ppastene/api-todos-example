'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {});
  role.associate = function(models) {
    // associations can be defined here
    role.hasMany(models.user, {
      foreignKey: 'role_id'
    })
  };
  return role;
};