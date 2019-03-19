module.exports  = (objectRepository) => {
    return (req,res,next) => {
        if(req.user.admin) {
            return next();
        }
        else {
            res.status(401).send('Hozzáférési hiba. Ön nem admin');
        }
    };
};