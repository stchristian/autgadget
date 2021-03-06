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
            kezdete : new Date(req.body.kezdete),
            vege : new Date(req.body.vege)
        };

        try {
            const result = await newRental.save();
            gadget._felelos.sendRentalEmail(result);
            res.locals.rental = result;
            req.flash('success_msg', 'Sikeres foglalás!');
            return next();
        }
        catch(err) {
            console.log(err);
            let validation_errors = [];
            if(err.name === "ValidationError") {
                validation_errors = Object.values(err.errors).map(err => err.message);
                return next();
            }
            if(err.logicError) {
                validation_errors.push(err.msg);
                req.flash('validation_errors', validation_errors);
                return next();
            }
            else {
                return next(err);
            }
        }
    };
};