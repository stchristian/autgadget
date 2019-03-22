const requireOption = require('../common').requireOption;

module.exports = (objectRepository) => {
    const commentModel = requireOption(objectRepository, "commentModel");

    return (req, res, next) => {
        const newComment = new commentModel();
        newComment._szerzo = req.user.id;
        newComment.szoveg = req.body.szoveg;

        newComment.save((err, result) => {
            if (err) {
                if (err.name === "ValidationError") {
                    res.locals.validation_errors = Object.values(err.errors).map(err => err.message );
                    return next();
                } 
                else 
                    return next(err);
            } else {
                res.locals.comment = result;
                next();
            }
        });
    };
};
