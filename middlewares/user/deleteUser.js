const requireOption = require('../common').requireOption;
/**
 * Kitörli a megadott id-jú felhasználót.
 */
module.exports = (objectRepository) => {
    const userModel = requireOption(objectRepository, 'userModel');

    return (req,res,next) => {
        userModel.deleteOne({ _id : req.params.userId })
            .exec((err) => {
                if(err) next(err);
                next();
            });
    };
};