const session = require("express-session");
const dotenv = require("dotenv/config")
const maxAge = 1000000000000000000000000000000000000000000000000000000000000000000;


const express = require("express");
const app = express();
const PORT = 8080;


app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    cookie: {maxAge: maxAge},
    // resave:false
    
}))
//Routes
const UserController = require("./user/userController");
const StudentController = require("./user/student/studentController")
const TeacherController = require("./user/teacher/teacherController")
const AdminController = require("./user/admin/adminController")

app.use("/", UserController);
app.use("/", StudentController);
app.use("/", TeacherController);
app.use("/", AdminController);

app.get("/", (req,res)=>{

    res.render("index")
})


//download files route 
app.get("/download/:url",(req, res)=>{

    const url = req.params.url;
    const path = `./public/assignments/${url}`;
    

    res.download(path)

})

//download submissions
app.get("/submission/:url",(req, res)=>{

    const url = req.params.url;
    const path = `./public/assignments/${url}`;
    

    res.download(path)

})

app.get("*", (req, res)=>{
    res.render("notfound")
})

app.listen(PORT, ()=>{
    console.log("=====SERVER ON=====")
})

