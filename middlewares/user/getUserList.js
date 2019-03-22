const requireOption = require('../common').requireOption;
/**
 * Lekéri az felhasználók listáját.
 */
module.exports = (objectRepository, filter) => {
    const userModel = requireOption(objectRepository, 'userModel');

    return async (req,res,next) => {
        const pageNo = parseInt(req.query.pageNo) || 1;
        const pageSize = 5;

        let query = {
            skip : pageSize * (pageNo - 1),
            limit : pageSize
        };

        let options = {};
        if(typeof filter !== 'undefined') {
            options = filter;
        }

        if(typeof req.query.kereses === 'string' && req.query.kereses != '' ) {
            options.$text = { $search : req.query.kereses };
            res.locals.kereses = req.query.kereses;
        }
        
        try {
            let totalCount = await userModel.countDocuments(options);
            let users = await userModel.find(options, {}, query);
    
            res.locals.users = users; 
            res.locals.totalCount = totalCount;
            res.locals.totalPages = Math.ceil(totalCount / pageSize);
            return next();
        }
        catch(err) {
            return next(err);
        }
    };
};