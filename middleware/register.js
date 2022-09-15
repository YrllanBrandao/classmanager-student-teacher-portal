const validateRegister = (req, res, next) =>{

    const {username, name, email, password, lastName, isAdministrator} = req.body;

   

    if(username === null || username === undefined)
    {
        res.status(400).send("invalid fild")
    }
    if(name === null || name === undefined)
    {
        res.status(400).send("invalid fild")
    }
    if(email === null || email  === undefined)
    {
        res.status(400).send("invalid fild")
    }
    if(username === null || username === undefined || password.length < 8)
    {
        res.status(400).send("invalid fild")
    }
    if(lastName === null || lastName === undefined)
    {
        res.status(400).send("invalid fild")
    }


    next();
    
}


module.exports = validateRegister;