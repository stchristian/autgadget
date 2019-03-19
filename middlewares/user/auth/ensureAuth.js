module.exports  = (objectRepository) => {
    return (req,res,next) => {
        if(req.isAuthenticated()) {
            res.locals.loggedInUser = req.user;
            return next();
        }
        else {
            res.status(401).send('Hozzáférési hiba.');
        }
    };
};