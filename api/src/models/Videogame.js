const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame',{
    id:{
      primaryKey: true,
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false
    },
    releasedate:{
      type:DataTypes.DATEONLY,
    },
    rating:{
      type:DataTypes.FLOAT
    },
    platforms:{
      type:DataTypes.JSON,
      allowNull:false
    }
  });
};
