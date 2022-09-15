const Sequelize = require("sequelize");
const Connection = require("../database/database");




const Submission = Connection.define("submission", {
    
   assignmentTitle:{
        type: Sequelize.STRING,
        allowNull:false
   },
   comment:{
    type: Sequelize.STRING,
        allowNull:false
   },
    owner: {
        type: Sequelize.STRING,
        allowNull:false
    },
    submissionUrl: {
       type: Sequelize.STRING,
       allowNull:false
    },
    markObtained:{
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    assignmentId:{
        type: Sequelize.STRING,
        allowNull:false
    }
    
})




Submission.sync({force:false})

module.exports = Submission;