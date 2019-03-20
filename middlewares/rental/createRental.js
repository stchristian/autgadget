const requireOption = require('../common').requireOption;
/**
 * Egy eszközt kikölcsönöz
 */
module.exports = (objectRepository) => {
    const rentalModel = requireOption(objectRepository, 'rentalModel');

    return async (req,res,next) => {
        if(typeof res.locals.gadget === "undefined") 
            return next();
        const gadget = res.locals.gadget;

        const newRental = new rentalModel();
        newRental._kolcsonzo = req.user.id;
        newRental._eszkoz = gadget.id;
        newRental.foglalas = {
            kezdete: new Date(req.body.kezdete),
            vege: new Date(req.body.vege),
        };

        try {
            const result = await newRental.save();
            //TODO: email küldése az eszközfelelősnek
            gadget._felelos.sendRentalEmail(result);
            res.locals.rental = result;
            console.log("sikeres kölcsönzés");
            console.log(result);
            return next();
        }
        catch(err) {
            if(err.name === "ValidationError") {
                res.locals.validation_errors = Object.values(err.errors).map(err => err.message);
                return next();
            }
            else {
                return next(err);
            }
        }
    };
};