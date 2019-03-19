module.exports = (objectRepository) => {
    return (req,res,next) => {
        if(typeof res.locals.gadget === "undefined" || typeof res.locals.comment === "undefined") {
            return next();
        }

        const gadget = res.locals.gadget;
        const comment = res.locals.comment;
        gadget.kommentek.push(comment.id);

        gadget.save((err, result) => {
            if(err) {
                //Ezt lehet kikéne szervezni?
                if(err.name === "ValidationError") {
                    res.locals.validation_errors = Object.values(err.errors).map(err => err.message);
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
