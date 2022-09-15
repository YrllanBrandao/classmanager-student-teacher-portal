const Sequelize = require("sequelize");
const Connection = require("../database/database");
const Teacher = require("../user/user");



const Notice = Connection.define("notice", {
    
    author: {
        type: Sequelize.STRING,
        allowNull:false
    },
    title: {
        type: Sequelize.STRING,
        allowNull:false
    },
    notice: {
        type: Sequelize.TEXT,
        allowNull:false
    },//the receivers is the classroom
    receiver:{
        type: Sequelize.STRING,
        allowNull:false
    }



})


Notice.sync({force:false});

module.exports = Notice;