async function studentMiddleware(req, res, next){


    const {accountType} = await req.session.user;
    
    if(accountType == 3)
    {
        
        next();

    }
    else{
        res.redirect("/forbidden")
    }
}


module.exports = studentMiddleware;