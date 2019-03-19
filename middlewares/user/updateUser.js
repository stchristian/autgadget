const requireOption = require('../common').requireOption;
/**
 * Egy felhasználót eszközfelelőssé illetve adminná tehet. Ehhez csak az adminnak van joga.
 */
module.exports = (objectRepository) => {
    const userModel = requireOption(objectRepository, 'userModel');

    return (req,res,next) => {
        let user;
        if(typeof res.locals.user !== 'undefined') 
            user = res.locals.user;
        else
            return next();

        user.vezeteknev = req.body.vezeteknev;
        user.keresztnev = req.body.keresztnev;
        user.email = req.body.email;
        user.telefonszam = req.body.telefonszam;
        user.eszkozfelelos = req.body.eszkozfelelos || false;
        user.admin = req.body.admin || false;
        
        if( req.body.jelszo !== '') {
            if(req.body.jelszo === req.body.jelszo2)
                user.jelszo = req.body.jelszo;
            else {
                res.locals.validation_errors = ["A megadott jelszavak nem egyeznek"];
                next();
            }
        }

        user.save((err, result) => {
            if(err) {
                //Ezt lehet kikéne szervezni?
                if(err.name === "ValidationError") {
                    res.locals.validation_errors = Object.values(err.errors).map(err => err.message);
                    return next();
                }
                else {
                    return next(err);
                }
            }
            else {
                res.locals.user = result;
                return next();
            }
        });
    };
};