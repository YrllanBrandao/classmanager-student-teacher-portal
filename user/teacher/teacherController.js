const User = require("../user");
const express = require("express");
const Router = express.Router();
const Classroom = require("../../classroom/classroom");
const Notice = require("../../notice/notice");
const Assignment = require("../../assignment/assignment");
const Submission = require("../../submission/submission")
const slugify = require("slugify")

//area multer

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assignments')
    },
    filename: function (req, file, cb) {
        console.log(slugify(req.body.title)+"===")
      cb(null, "assignment_"+slugify(req.body.title)+"_"+path.extname(file.originalname))
    }
  })

const upload = multer({storage: storage});


Router.get("/home/teacher", (req, res) =>{

 
    res.render("teacher/index",{
        username: req.session.user.username
        
    })

}
)


Router.get("/home/teacher/write_notice", (req,res)=>{
    const user = req.session.user;
    Classroom.findAll({
        where:{
            teacher: user.username
        }
    }).then(classrooms =>{
        res.render("teacher/writeNotice",{
            username: req.session.user.username,
            classrooms: classrooms
        })
    })
})

Router.post("/home/teacher/save_notice",(req,res)=>{

    const {title,  notice, receiver} = req.body;
    const {email} = req.session.user;


    User.findOne({
        where:{
            email:email
        }
    }).then(user =>{

        Notice.create({
            author: user.username,
            title: title,
            notice: notice,
            receiver: receiver,
            userId: user.id
        }).then(notice =>{

            res.redirect("/home/teacher")
        })

    })

   


})

Router.post('/home/teacher/assignment/upload', upload.single('formFile') ,(req,res)=>{

        const {title, assignment, mark, receiver, ext,deadline} = req.body;
        const {email} = req.session.user;
        let url = 'empty';

        console.log(ext + "<")
        if(ext !== 'empty')
        {
            
            url =  `assignment_${slugify(title)}_.${ext}`;
        }
        

    User.findOne({
        where:{
            email:email
        }
    }).then(user =>{

        Assignment.create({

            title: title,
            receiver: receiver,
            assignment: assignment,
            fileUrl: url,
            mark: mark,
            deadline: deadline,
            teacher: user.username

           
        }).then( result =>{

            res.redirect("/home/teacher")
        })

    })

})


//assignments routes
Router.get("/home/teacher/assignment/new",(req,res)=>{
    const {username} = req.session.user;
  

    Classroom.findAll({
        where:{
            teacher: username
        }
    })
    .then(classrooms =>{

        res.render("teacher/newassignment",{
            username: req.session.user.username,
            classrooms: classrooms,
            
        })
    })

})

Router.get("/home/teacher/assignments", (req,res)=>{
    const  user =  req.session.user;

    Assignment.findAll({
        where:{
           teacher: user.username
        }
    }).then(assignments =>{

        res.render("teacher/assignments",{
            username: user.username,
            assignments:assignments
        })

    })



})

Router.get("/home/teacher/assignment/:id", (req,res)=>{
    const  user =  req.session.user;
    const id = req.params.id;

    Assignment.findOne({
        where:{
           id
        }
    }).then(assignment =>{

        Submission.findAll({
            where:{
                assignmentTitle: assignment.title
            }
        }).then(submissions =>{

            res.render("teacher/assignment",{
                username: user.username,
                assignment,
                submissions
            })
        })

    })



})

//profile routes
Router.get("/home/teacher/profile", (req,res)=>{
    
    const  user =  req.session.user;

    res.render("teacher/profile",{
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
    })
})

//classroom routes
Router.get("/home/teacher/classrooms",(req,res)=>{
    const {username} = req.session.user;

    Classroom.findAll({
        where:{
            teacher: username
        }
    }).then(classrooms =>{
        res.render('teacher/classrooms', {
            username,
            classrooms
        })
    })
})

Router.get("/home/teacher/classroom/:id",(req,res)=>{
    const {username} = req.session.user;
    const id = req.params.id;


    Classroom.findOne({
        where: {
            id
        }
    }).then(classroom =>{

        User.findAll({
            where:{
                group: classroom.title
            }
        }).then(students =>{

            res.render("teacher/classroom",{
                username,
                classroom,
                students
            })
        })

    })
    

})

module.exports = Router;