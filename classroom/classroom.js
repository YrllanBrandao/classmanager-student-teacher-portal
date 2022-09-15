const Sequelize = require("sequelize");
const Connection = require("../database/database");
const User = require("../user/user")


const Classroom = Connection.define("classroom", {
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull:false
    },
    teacher:{
        type: Sequelize.STRING,
        allowNull:false
    }

})

// Classroom.hasMany(User);

Classroom.sync({force:false})

module.exports = Classroom;