module.exports = (objectRepository) => {
    return (req,res,next) => {
        if(typeof res.locals.gadget === "undefined" || typeof res.locals.comment === "undefined") {
            return next();
        }

        const gadget = res.locals.gadget;
        const comment = res.locals.comment;
        gadget._kommentek.push(comment.id);

        gadget.save((err, result) => {
            if(err) {
                if(err.name === "ValidationError") {
                    req.flash('validation_errors', Object.values(err.errors).map(err => err.message));
                    return next();
                }
                else {
                    return next(err);
                }
            }
            else {
                return next();
            }
        });
    }
}
