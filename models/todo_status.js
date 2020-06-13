'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo_status = sequelize.define('todo_status', {
    title: DataTypes.STRING
  }, {});
  todo_status.associate = function(models) {
    // associations can be defined here
    todo_status.hasMany(models.todo, {
      foreignKey: 'status_id'
    })
  };
  return todo_status;
};