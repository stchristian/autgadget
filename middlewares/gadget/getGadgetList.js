const requireOption = require('../common').requireOption;
/**
 * Lekéri az eszközök listáját.
 */
module.exports = (objectRepository) => {
    const gadgetModel = requireOption(objectRepository, 'gadgetModel');

    return async (req,res,next) => {
        let query = {};
        if(typeof req.query.kereses === 'string' && req.query.kereses !== '') {
            query.$text = {
                $search : req.query.kereses
            }
            res.locals.kereses = req.query.kereses;
        }
        try {
            let gadgets = await gadgetModel.find(query)
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