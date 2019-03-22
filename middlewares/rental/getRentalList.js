const requireOption = require('../common').requireOption;
/**
 * Lekéri az a kölcsönzések listáját, a gadgetId szerepel mit paraméter akkor csak az arra az eszközre vonatkozó kölcsönzéseket kapjuk vissza.
 */
module.exports = (objectRepository) => {
    const rentalModel = requireOption(objectRepository, 'rentalModel');

    return async (req,res,next) => {
        let conditions = {};
        let options = {};
        let totalCount;

        try {
            if(typeof req.params.gadgetId !== 'undefined') {
                conditions._eszkoz = req.params.gadgetId;
                res.locals.gadgetId = req.params.gadgetId;
            }
            if(typeof req.query.kereses === 'string' && req.query.kereses !== '') {
                conditions.$text = {
                    $search : req.query.kereses
                }
                res.locals.kereses = req.query.kereses;
            }

            totalCount = await rentalModel.countDocuments(conditions);

            if(totalCount > 0) {
                const pageSize = 6;
                const totalPages = Math.ceil(totalCount / pageSize);
                let pageNo = parseInt(req.query.pageNo) || 1;
                if(pageNo > totalPages) {
                    pageNo = totalPages;
                }
                else if (pageNo < 1) {
                    pageNo = 1;
                }
                options.skip = pageSize * (pageNo - 1);
                options.limit = pageSize;
    
                let rentals = await rentalModel.find(conditions, {}, options)
                    .populate("_kolcsonzo", "vezeteknev keresztnev")
                    .populate("_eszkoz", "nev");
    
                res.locals.totalCount = totalCount;
                res.locals.totalPages = totalPages;
                res.locals.currentPage = pageNo;
                res.locals.rentals = rentals;
            }
            else {
                res.locals.totalCount = 0;
                res.locals.totalPages = 0;
                res.locals.currentPage = 0;
                res.locals.rentals = [];
            }
            next();
        }
        catch(err) {
            if(err) next(err);
        }
        // let query = {
        //     skip : pageSize * (pageNo - 1),
        //     limit : pageSize
        // };

        // let filter = {};
        // if(req.query.myrentals == true) {
        //     filter._id = req.user.id;
        // }
        // if(typeof req.params.gadgetId !== undefined) {
        //     filter._eszkoz = req.params.gadgetId;
        // }

        // try {
        //     const totalCount = await rentalModel.countDocuments();
        //     res.locals.totalCount = totalCount;
        //     res.locals.totalPages = Math.ceil(totalCount / pageSize);
        //     let rentals = await rentalModel.find(filter, {}, query)
        //         .populate("_kolcsonzo", "vezeteknev keresztnev")
        //         .populate("_eszkoz", "nev");
        //     if(typeof req.query.kereses === 'string' && req.query.kereses != '' ) {
        //         var regex = new RegExp(`.*${req.query.kereses}.*`, 'i');
        //         rentals = rentals.filter((rental) => {
        //             return rental._kolcsonzo.teljesNev.match(regex) ||
        //                 rental._eszkoz.nev.match(regex);
        //         });
        //     }
        //     res.locals.rentals = rentals;
        //     next();
        // }
        // catch(err) {
        //     if(err) next(err);
        // }
    };
};