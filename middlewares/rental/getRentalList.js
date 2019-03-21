const requireOption = require('../common').requireOption;
/**
 * Lekéri az a kölcsönzések listáját
 */
module.exports = (objectRepository) => {
    const rentalModel = requireOption(objectRepository, 'rentalModel');

    return async (req,res,next) => {
        
        const pageNo = parseInt(req.query.pageNo) || 1;
        const pageSize = 10;


        let query = {
            skip : pageSize * (pageNo - 1),
            limit : pageSize
        };

        let filter = { };
        if(req.query.myrentals == true) {
            filter._id = req.user.id;
        }

        try {
            const totalCount = await rentalModel.countDocuments();
            res.locals.totalCount = totalCount;
            res.locals.totalPages = Math.ceil(totalCount / pageSize);
            let rentals = await rentalModel.find(filter, {}, query)
                .populate("_kolcsonzo", "vezeteknev keresztnev")
                .populate("_eszkoz", "nev");
            if(typeof req.query.kereses === 'string' && req.query.kereses != '' ) {
                var regex = new RegExp(`.*${req.query.kereses}.*`, 'i');
                rentals = rentals.filter((rental) => {
                    return rental._kolcsonzo.teljesNev.match(regex) ||
                        rental._eszkoz.nev.match(regex);
                });
            }
            res.locals.rentals = rentals;
            next();
        }
        catch(err) {
            if(err) next(err);
        }
    };
};