const middleware = (req,res, next) =>{

    const { user}  = req.session;


    console.log(user);

    next();
}


module.exports = middleware;