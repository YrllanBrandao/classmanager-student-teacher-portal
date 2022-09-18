//controllers
const User = require("./user");


//
const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profile')
    },
    filename: function (req, file, cb) {

        cb(null, "profile_" + req.body.username + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });


// register user

// denied acess 403

Router.get("/forbidden", (req, res) => {

    res.render("forbidden")
})

// logout

Router.get("/logout", (req, res) => {

    req.session.destroy()

    res.redirect("/")

})
//this route does the authentication
Router.post("/authentication", (req, res) => {

    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase()


    User.findOne({
        where: {
            email: lowerEmail
        }
    }).then((user) => {

        if (user !== undefined && user !== null) {
            const correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    username: user.username,
                    email: user.email,
                    accountType: user.accountType,
                    profilePicture: user.profilePictureUrl,
                    id: user.id


                }
                console.log("====LOGGED====")
                res.redirect("/home")
            }
            else {
                res.send("incorrect")
            }

        }
        else {
            res.redirect("/login")
        }

    });

})

// home - this does redirection by type-based account



Router.get("/home", (req, res) => {



    const { accountType } = req.session.user;
    const type = Number(accountType);



    switch (type) {
        case 1://if admin

            res.redirect("/home/admin");

            break;

        case 2://if teacher
            res.redirect("/home/teacher");

            break;

        case 3://if student
            res.redirect("/home/student");

            break;
    }


}
)

// forbidden acess

Router.get("/forbidden", (req, res) => {

    res.render("forbidden")
})




//Profile Routes

Router.get("/profile", (req, res) => {
    const user = req.session.user;
    res.render("./user/profile", {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
    })
})

//Login route

Router.get("/login", (req, res) => {

    res.render("login")
})


//change passwd
Router.get("/change_password", (req, res) => {
    const { username } = req.session.user;

    res.send('password', {
        username
    })
})

module.exports = Router;