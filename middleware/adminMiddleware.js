async function administratorMiddleware(req, res, next){


    const {accountType} =  req.session.user;
    
    if(accountType == 1)
    {
        
        next();

    }
    else{
        res.redirect("/forbidden")
    }
}


module.exports = administratorMiddleware;