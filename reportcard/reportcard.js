const Sequelize = require("sequelize");
const Connection = require("../database/database");
const User = require("../user/user");

const ReportCard = Connection.define('reportcard', {
    n1:{
        type:Sequelize.FLOAT,
        defaultValue: 0
    },
    n2:{
        type:Sequelize.FLOAT,
        defaultValue: 0
    },
    n3:{
        type:Sequelize.FLOAT,
        defaultValue: 0
    },
    average:{
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
   
});

ReportCard.belongsTo(User);
User.hasOne(ReportCard);


ReportCard.sync({force:false});


module.exports = ReportCard;