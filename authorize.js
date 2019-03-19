module.exports = {
    isAuthenticated: function (cb) {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                cb(req, res);
            }
            else {
                res.status(401).send('Hozzáférési hiba.');
            }
        };
    },
    ensureAuthenticated: function(req,res,next) {
        if(req.isAuthenticated())
            return next();
        else {
            res.status(401).send('Hozzáférési hiba.');
        }
    },

    ensureAdmin: function(req,res,next) {
        
    }

};