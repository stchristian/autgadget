const requireOption = require('../common').requireOption;
/**
 * Egy új felhasználót hoz létre.
 */
module.exports = (objectRepository) => {
    const userModel = requireOption(objectRepository, 'userModel');

    return (req,res,next) => {
        const newUser = new userModel();
        newUser.vezeteknev = req.body.vezeteknev;
        newUser.keresztnev = req.body.keresztnev;
        newUser.email = req.body.email;
        newUser.jelszo = req.body.jelszo;
        newUser.telefonszam = req.body.telefonszam;

        if(req.body.jelszo !== req.body.jelszo2) {
            //TODO
        }

        newUser.save((err, result) => {
            if(err) {
                //Ezt lehet kikéne szervezni?
                if(err.name === "ValidationError") {
                    res.locals.validation_errors = Object.values(err.errors).map(err => err.message);
                    next();
                }
                else {
                    next(err);
                }
            }
            else {
                res.locals.newUser = result;
                next();
            }
        });
    };
};