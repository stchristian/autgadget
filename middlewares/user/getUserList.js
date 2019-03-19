const requireOption = require('../common').requireOption;
/**
 * Lekéri az felhasználók listáját.
 */
module.exports = (objectRepository) => {
    const userModel = requireOption(objectRepository, 'userModel');

    return (req,res,next) => {
        const pageNo = parseInt(req.query.pageNo) || 1;
        const pageSize = 5;

        let query = {
            skip : pageSize * (pageNo - 1),
            limit : pageSize
        };

        if(typeof req.query.kereses === 'string' && req.query.kereses != '' ) {
            userModel.countDocuments( { $text : {$search : req.query.kereses }}, (err, totalCount) => {
                userModel.find( { $text : {$search : req.query.kereses }}, {}, query)
                    .exec( (err, users) => {
                        if(err) next(err);
                        res.locals.kereses = req.query.kereses;
                        res.locals.users = users; 
                        res.locals.totalCount = totalCount;
                        res.locals.totalPages = Math.ceil(totalCount / pageSize);
                        next();
                    });
            });
        }
        else {
            userModel.countDocuments((err, totalCount) => {
                userModel.find({}, {}, query)
                .exec((err, users) => {
                    if(err) next(err);
                    res.locals.users = users;
                    res.locals.totalCount = totalCount;
                    res.locals.totalPages = Math.ceil(totalCount / pageSize);
                    //res.locals.totalPages = 10;
                    next();
                });
            });
        }
    };
};