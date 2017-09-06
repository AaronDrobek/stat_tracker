'use strict';
module.exports = function(sequelize, DataTypes) {
  var Stat = sequelize.define('Stat', {
    activity_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});

  Stat.associate = function(models) {
    Stat.belongsTo(models.Activity, {
      as: 'Stat',
      foreignKey: 'activity_id'
    })
  }
  return Stat;
};
