const teacherMiddleware = (req, res, next) =>{
    const {accountType} = Number(req.session.user)

    if(accountType === 2)
    {
        
        next();

    }
    else{
        res.redirect("/forbidden")
    }
}


module.exports = teacherMiddleware;