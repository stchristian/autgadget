const requireOption = require('../common').requireOption;
/**
 * Egy új eszközt hoz létre.
 */
module.exports = (objectRepository) => {
    const gadgetModel = requireOption(objectRepository, 'gadgetModel');

    return async (req,res,next) => {
        console.log(req.files);
        let kepek = [];
        if(typeof req.files !== "undefined")
            kepek = req.files.map(file => file.path);

        const newGadget = new gadgetModel();
        newGadget.nev = req.body.nev;
        newGadget.sorszam = req.body.sorszam;
        newGadget.leiras = req.body.leiras;
        newGadget.qrkod = req.body.qrkod;
        newGadget.tartozekok = typeof req.body.tartozekok === "string" ? req.body.tartozekok.split(',').map( item => item.trim()) : undefined;
        newGadget._felelos = req.user.id;
        newGadget.kepek = kepek;
        
        try {
            gadget = await newGadget.save();
            res.locals.gadget = gadget;
            return next();
        }
        catch(err) {
            if(err.name === "ValidationError") {
                res.locals.validation_errors = Object.values(err.errors).map(err => err.message);
                return next();
            }
            else {
                return next(err);
            }
        }
    };
};