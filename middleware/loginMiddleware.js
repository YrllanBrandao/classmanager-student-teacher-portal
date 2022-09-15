const loginMiddleware = (req,res, next) =>{

    if(req.user === undefined )
    {
        res.redirect("/login")
    }
    next()
}

module.exports =loginMiddleware;