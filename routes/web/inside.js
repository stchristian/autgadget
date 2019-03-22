const userModel = require('../../models/user');
const gadgetModel = require('../../models/gadget');
const rentalModel = require('../../models/rental');

const ensureAuthMW = require('../../middlewares/user/auth/ensureAuth');
const logoutUserMW = require('../../middlewares/user/auth/logoutUser');
const mainRedirectMW = require('../../middlewares/mainRedirect');
const flashMessagesMW = require('../../middlewares/flashMessages');
const userRouter = require('./user');
const gadgetRouter = require('./gadget');

module.exports = (app) => {
    var objectRepository = {
        userModel: userModel,
        gadgetModel: gadgetModel,
        rentalModel: rentalModel
    };

    app.use(flashMessagesMW(objectRepository));
    app.use('/user', ensureAuthMW(objectRepository));
    app.use('/gadget', ensureAuthMW(objectRepository));
    app.use('/rental', ensureAuthMW(objectRepository));

    app.use('/user', require('./user')(objectRepository));
    app.use('/gadget', require('./gadget')(objectRepository));
    app.use('/rental', require('./rental')(objectRepository));

    app.use('/logout', 
        logoutUserMW(objectRepository),
        mainRedirectMW(objectRepository),
    )
}