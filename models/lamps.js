const { Model, DataTypes } = require('sequelize');
const db = require('../config.js')

const Lamp = db.define('lamp', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type:DataTypes.TEXT
    },
    url:{
        type:DataTypes.TEXT
    } ,
    price:{
        type:DataTypes.FLOAT
    } 
  });

  module.exports = Lamp