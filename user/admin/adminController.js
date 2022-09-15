const User = require("../user");
const middleware =  require("../../middleware/adminMiddleware")
const Classroom = require("../../classroom/classroom")
const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const slugify = require("slugify");
const multer = require("multer");
const path = require("path");
const ReportCard = require("../../reportcard/reportcard");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/profile')
    },
    filename: function (req, file, cb) {
     
      cb(null, "profile_"+req.body.username+ path.extname(file.originalname))
    }
  })

const upload = multer({storage: storage});


Router.get("/home/admin", middleware, (req, res) =>{

 
    res.render("admin/index",{
        username: "---"
    })

}
)


// profile routes

Router.get("/home/admin/profile", middleware, (req, res)=>{

    // const {user} = req.session;
    res.render("admin/profile",{
        username: "ADMINISTRATOR"
    })


})



// user register users
Router.get("/home/admin/register_user", middleware, (req,res)=>{

    Classroom.findAll().then(classroom =>{


        res.render("admin/register",{
            classes: classroom
        })
    })

})
//save users
Router.post("/home/admin/register_user/save",middleware,upload.single('profilePicture'),(req,res)=>{

    const {name, lastName, username, email, password, accountType, classroom, ext} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);
    User.create({
        profilePictureUrl: `profile_${username}.${ext}`,
        name: name,
        lastName:lastName,
        username: username,
        email: email,
        password: passwordHashed,
        accountType: accountType,
        group: classroom
    })
    .then(result =>{
        User.findOne({
            where:{
                email
            }
        }).then(user =>{

            ReportCard.create({
                userId: user.id
            }).then(report =>{
                res.redirect("/login")
    
            })
        })
    })

})
// classroom section
Router.get("/home/admin/register_classroom",middleware,(req,res)=>{

    const accountType = 2
    User.findAll({
        where:{
            accountType: accountType
        }
    }).then(teachers =>{

        res.render("admin/registerClassroom",{
            teachers: teachers
        })
    })

})

// save classroom

Router.post("/home/admin/register_classroom/save",middleware, (req,res)=>{

   const {title, myteacher} = req.body;



   
   Classroom.create({
    title: slugify(title),
    slug: slugify(title),
    teacher: myteacher

   }).then(result=>{
    res.redirect("/home/admin")
   })


})

//list classrooms
Router.get("/home/admin/classrooms_list", middleware, (req,res)=>{

    Classroom.findAll().then(classroom =>{

        res.render("admin/classrooms",{
            classrooms: classroom
        })
    })
 
 
 })

//list classroom members
Router.get("/home/admin/classroom/:title", middleware,(req,res)=>{
    const title = req.params.title;
    const accountType = 3;
    
    User.findAll({
        where:{
            accountType: accountType,
            group: title
        }
    }).then(members =>{

        res.render("admin/members",{
            title: title,
            members: members
        })
    })
})
// validateRegister
// this route contain a validation middleware 


// list users routes

Router.get("/home/admin/teachers_list",middleware, (req,res)=>{

    User.findAll({
        where:{
            accountType: '2'
        }
    }).then(teacher =>{

        res.render("admin/teachers",{
            teachers: teacher
        })

    })
})

Router.get("/home/admin/students_list",middleware, (req,res)=>{

    User.findAll({
        where:{
            accountType: '3'
        }
    }).then(student =>{

        res.render("admin/students",{
            students: student
        })

    })
})

Router.get("/home/admin/administrators_list",middleware, (req,res)=>{
    const accountType = 1;
    User.findAll({
        where:{
            accountType: accountType
        }
    }).then(admin =>{

        res.render("admin/admins",{
            admins: admin
        })

    })
})
module.exports = Router;