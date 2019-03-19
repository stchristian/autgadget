const requireOption = require('../common').requireOption;
/**
 * Lekér egy megadott id-val rendelkező felhasználót.
 */
module.exports = (objectRepository) => {
    const userModel = requireOption(objectRepository, 'userModel');

    return (req,res,next) => {
        userModel.findOne({ _id : req.params.userId })
            .exec((err, user) => {
                if(err) next(err);
                if(user) {
                    res.locals.user = user;
                }
                next();
            });
    };
};