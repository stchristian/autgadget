const requireOption = require('../common').requireOption;
/**
 * Lekéri az eszközök listáját.
 */
module.exports = (objectRepository) => {
    const gadgetModel = requireOption(objectRepository, 'gadgetModel');

    return async (req,res,next) => {
        let conditions = {};
        let options = {};
        let totalCount;
        try {
            if(typeof req.query.kereses === 'string' && req.query.kereses !== '') {
                conditions.$text = {
                    $search : req.query.kereses
                }
                res.locals.kereses = req.query.kereses;
            }
            if( typeof req.query.sajat_eszkozok !== 'undefined' && req.query.sajat_eszkozok) {
                console.log(req.query.sajat_eszkozok);
                conditions._felelos = res.locals.loggedInUser.id;
                res.locals.sajat_eszkozok = true;
            }
            else {
                res.locals.sajat_eszkozok = false;
            }

            totalCount = await gadgetModel.countDocuments(conditions);

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

            let gadgets = await gadgetModel.find(conditions, {}, options);

            res.locals.totalCount = totalCount;
            res.locals.totalPages = totalPages;
            res.locals.currentPage = pageNo;
            res.locals.gadgets = gadgets;
            next();
        }
        catch(err) {
            if(err) next(err);
        }
    };
};