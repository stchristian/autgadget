const requireOption = require('../common').requireOption;
/**
 * Lekéri az a kölcsönzések listáját egy adott eszközre, ahol a foglalás vége az aktuális dátum után van.
 */
module.exports = (objectRepository) => {
    const rentalModel = requireOption(objectRepository, 'rentalModel');

    return async (req,res,next) => {
        let filter = { 
            _eszkoz : req.params.gadgetId,
            "foglalas.vege":  {
                $gt: new Date()
            }
        };
        try {
            let rentals = await rentalModel.find(filter);
            res.locals.rentals = rentals;
            next();
        }
        catch(err) {
            if(err) next(err);
        }
    };
};