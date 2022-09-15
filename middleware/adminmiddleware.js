const administratorMiddleware = (req, res, next) =>{
    const {accountType} = Number(req.session.user)

    if(accountType === 1)
    {
        next();

    }
    else{
        res.redirect("/forbidden")
    }
}


module.exports = administratorMiddleware;