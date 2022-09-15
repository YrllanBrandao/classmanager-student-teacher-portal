const Sequelize = require("sequelize");
const Connection = require("../database/database");




const User = Connection.define("user", {
    profilePictureUrl:{
        type: Sequelize.STRING,
        // allowNull:false
    },
    username: {
        type: Sequelize.STRING,
        allowNull:false
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull:false
    },

    email: {
        type: Sequelize.STRING,
        allowNull:false
        // primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false
    },
    
    accountType:{
        type: Sequelize.STRING,
        allowNull:false
    },
    group:{//this is classroom
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue: ""
    }
})



User.sync({force:false})

module.exports = User;