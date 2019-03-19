const requireOption = require('../common');
/**
 * Kitörli az eszközt.
 */
module.exports = (objectRepository) => {

    const gadgetModel = requireOption(objectRepository, 'gadgetModel');

    return (req,res,next) => {
        if(typeof res.locals.gadget === "undefined" || typeof req.params.gadgetId === "undefined") {
            return next();
        }
        else if(req.params.gadgetId) {
            gadgetModel.deleteOne({ _id : req.params.gadgetId }, (err) => {
                if(err)
                    return next(err);
                else
                    return next();
            })
        }
        // res.locals.gadget.remove((err) => {
        //     if(err) {
        //         return next(err);
        //     }
        //     next();
        // })
    }
}