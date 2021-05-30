'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reviews.belongsTo(models.Artist, {
        foreignKey: 'artist',
        as: 'Artist',
        onDelete: 'CASCADE',
      });
      Reviews.belongsTo(models.Customer, {
        foreignKey: 'customer',
        as: 'Customer',
        onDelete: 'CASCADE',
      });
    }
  };
  Reviews.init({
    rating: DataTypes.INTEGER,
    content: DataTypes.STRING,
    replies:DataTypes.JSONB,
    artist: DataTypes.INTEGER,
    customer: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};