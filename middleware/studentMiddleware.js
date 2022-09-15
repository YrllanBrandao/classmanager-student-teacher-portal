const studentMiddleware = (req, res, next) =>{
    const {accountType} = Number(req.session.user)

    if(accountType === 4)
    {
        
        next();

    }
    else{
        res.redirect("/forbidden")
    }
}


module.exports = studentMiddleware;