const Sequelize = require("sequelize");
const Connection = require("../database/database");



const Assignment = Connection.define("assignment", {
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },
    receiver:{
        type: Sequelize.STRING,
        // allowNull:false
    },
   assignment:{
    type: Sequelize.TEXT,
    allowNull:false
   },
   fileUrl:{
    type: Sequelize.STRING,
   },
   mark:{
    type: Sequelize.STRING,
    allowNull:false
   },
   deadline:{
    type: Sequelize.STRING,
    allowNull:false
   },
   teacher:{
    type: Sequelize.STRING,
    allowNull:false
   }
})



Assignment.sync({force:false})

module.exports = Assignment;