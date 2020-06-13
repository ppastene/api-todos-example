'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  todo.associate = function(models) {
    // associations can be defined here
    todo.belongsTo(models.todo_status, {
      foreignKey: 'status_id'
    }),
    todo.belongsTo(models.user, {
      foreignKey: 'user_id'
    })
  };
  return todo;
};