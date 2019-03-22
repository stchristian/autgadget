const requireOption = require('../common').requireOption;
/**
 * Lekér egy megadott id-val rendelkező eszközt.
 */
module.exports = (objectRepository) => {
    const gadgetModel = requireOption(objectRepository, 'gadgetModel');

    return async (req,res,next) => {
        try {
            let gadget = await gadgetModel.findOne({ _id : req.params.gadgetId })
                .populate({
                    path: '_felelos'
                })
                .populate({
                    path: '_kommentek',
                    populate: {
                        path: '_szerzo',
                        select: 'keresztnev vezeteknev'
                    }
                })
            res.locals.gadget = gadget;
            res.locals.gadget.allapot = await gadget.checkAllapot();

            return next();
        }
        catch(err) {
            if(err) return next(err);
        }
    };
};