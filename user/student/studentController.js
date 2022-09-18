const User = require("../user")
const express = require("express");
const Router = express.Router();
const middleware = require("../../middleware/studentMiddleware")
const Notice = require("../../notice/notice");
const Assignment = require("../../assignment/assignment");
const Submission = require("../../submission/submission");
const ReportCard = require("../../reportcard/reportcard")
const slugify = require("slugify");
const path = require("path");
const multer = require("multer");
const bcrypt = require('bcrypt')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/submission')
    },
    filename: (req, file, cb) => {
        cb(null, 'submission_' + req.body.owner + path.extname(file.originalname))
    }
});

const upload = multer({
    storage, limits: {
        fileSize: 524288//5MB
    }
})

Router.get("/home/student", middleware, (req, res) => {


    res.render("student/index", {
        username: req.session.user.username
    });

}
)

Router.get("/home/student/profile", middleware, (req, res) => {

    const user = req.session.user;

    res.render("student/profile", {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
    });
})

Router.get("/home/student/classroom_notices", middleware, (req, res) => {
    const accountType = 3;
    const { username } = req.session.user;

    console.log(username + "USER--")

    User.findOne({
        where: {

            username: username
        }

    }).then(student => {


        Notice.findAll(
            {
                where: {
                    receiver: student.group
                },
                order: [['id', 'DESC']]
            }
        ).then(notices => {

            res.render('student/noticesportal', {
                notices
            })
        })


    })

})


//view notice by id

Router.get("/home/student/classroom_notice/:id", middleware, (req, res) => {

    const noticeId = req.params.id;

    Notice.findOne({
        where: {
            id: noticeId
        }
    })
        .then(notice => {

            res.render("student/notice", {
                notice
            })
        })

})

// view  all assignments

Router.get("/home/student/assignments", middleware, (req, res) => {

    const { username, email } = req.session.user;

    User.findOne({
        where: {
            username: username,
            email: email
        }
    }).then(student => {

        Assignment.findAll({
            where: {
                receiver: student.group
            }
        }).then(assignments => {

            res.render("student/assignments", {
                username,
                assignments
            })
        })


    })

})

Router.get("/home/student/assignment/:id", middleware, (req, res) => {
    const { username } = req.session.user;
    const id = req.params.id;

    console.log(id + "<-id")

    //submited?
    Submission.findOne({
        where: {
            assignmentId: id
        }
    }).then(submission => {
        console.log(submission)
        if (submission !== undefined && submission !== null) {
            Assignment.findOne({
                where: {
                    id: id
                }
            }).then(assignment => {

                res.render("student/assignment", {
                    username,
                    assignment,
                    submited: true
                })

            })
        }
        else {
            Assignment.findOne({
                where: {
                    id: id
                }
            }).then(assignment => {

                res.render("student/assignment", {
                    username,
                    assignment,
                    submited: false
                })

            })
        }
    })





})


Router.post("/home/student/assignment/submit", middleware, upload.single('submission'), (req, res) => {

    const { owner, assignmentId, assignmentTitle, comment, ext } = req.body;

    Submission.create({
        assignmentTitle,
        comment,
        owner,
        submissionUrl: 'submission_' + owner + assignmentTitle + "." + ext,
        assignmentId
    }).then(submission => {

        res.redirect("/home/student");
    })

})

//marks
Router.get("/home/student/marks", (req, res) => {
    const { username, id } = req.session.user;

    ReportCard.findOne({
        where: {
            userId: Number(id)
        }
    }).then(reportcard => {
        res.render("student/marks", {
            username,
            reportcard
        })
    })

})

//change pass
Router.get("/home/student/change_password", middleware, (req, res) => {
    const { username, email } = req.session.user;

    User.findOne({
        username,
        email
    }).then(user => {

        res.render('student/password', {
            username,
            password: user.password
        })
    })
})

Router.post("/home/student/change_password", middleware, (req, res) => {
    const { username, email } = req.session.user;
    const { newPassword, newPasswordCopy } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(newPassword, salt)

    if (newPassword === newPasswordCopy) {
        User.update({
            password: passwordHashed
        }, {
            where: {
                username,
                email
            }
        }).then(user => {

            res.redirect("/home/student/")
        })
    }
    else {
        res.send("the passwords don't math!")
    }


})

module.exports = Router;