/**
 * Frissít egy eszközt. Előtte a res.localson kell legyen a frissítendő eszköz.
 */
module.exports = (objectrepository) => {

  //var gadgetModel = requireOption(objectrepository, 'eszkozModel');

  return function (req, res, next) {

    if(!res.locals.gadget) {
        next();
    }

    let ujKepek = [];
    if(typeof req.files !== "undefined")
        ujKepek = req.files.map(file => file.path);

    const gadget = res.locals.gadget;
    gadget.nev = req.body.nev;
    gadget.sorszam = req.body.sorszam;
    gadget.leiras = req.body.leiras;
    gadget.tartozekok = req.body.tartozekok;
    gadget.felelos = req.user.id;
    gadget.kepek = gadget.kepek.filter((val) => !req.body.torolt_kepek.includes(val) ).concat(ujKepek);

    gadget.save((err, result) => {
        if(err) {
            //Ezt lehet kikéne szervezni?
            if(err.name === "ValidationError") {
                res.locals.validation_errors = Object.values(err.errors).map(err => err.message);
                next();
            }
            else {
                next(err);
            }
        }
        else {
            res.locals.gadget = result;
            next();
        }
    });
  };

};
