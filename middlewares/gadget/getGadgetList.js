const requireOption = require('../common').requireOption;
/**
 * Lekéri az eszközök listáját.
 */
module.exports = (objectRepository) => {
    const gadgetModel = requireOption(objectRepository, 'gadgetModel');

    return async (req,res,next) => {
        try {
            let gadgets = await gadgetModel.find()
                .populate("_felelos");
            
            for(let i in gadgets) {
                gadgets[i].allapot = await gadgets[i].checkAllapot();
            }
            res.locals.gadgets = gadgets;
            next();
        }
        catch(err) {
            if(err) next(err);
        }
    };
};