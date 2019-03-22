/**
 * 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.validation_errors = req.flash('validation_errors');
        res.locals.success_msg = req.flash('success_msg');
        return next();
    };
};