'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    activity: DataTypes.STRING,
    measurement: DataTypes.STRING
  }, {});

Activity.associate = function(models) {
  Activity.hasMany(models.Stat, {
    as:'Stats', foreignKey:'activity_id'
  })
}

  return Activity;
};
