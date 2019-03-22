const mainRedirectMW = require('../../middlewares/mainRedirect');
const renderViewMW = require('../../middlewares/renderView');
const loginUserMW = require('../../middlewares/user/auth/loginUser');
const createUserMW = require('../../middlewares/user/createUser');
const registerRedirectMW = require('../../middlewares/registerRedirect');
const userModel = require('../../models/user');
const flashMessagesMW = require('../../middlewares/flashMessages');

module.exports = (app) => {
    var objectRepository = {
        userModel: userModel
    };

    app.use(flashMessagesMW(objectRepository));

    app.get('/',
        mainRedirectMW(objectRepository)
    );

    app.get('/login',
        renderViewMW(objectRepository, 'login')
    );

    app.post('/login',
        loginUserMW(objectRepository),
        mainRedirectMW(objectRepository)
    )

    app.get('/register',
        renderViewMW(objectRepository, 'register')
    );

    app.post('/register',
        createUserMW(objectRepository),
        registerRedirectMW(objectRepository)
    );

    app.post('/test', (req,res,next) => {
        res.json(req.body);
    });

    app.get('/uploadtest',
        renderViewMW(objectRepository, 'uploadtest')
    );

    app.post('/uploadtest', 
        require("../../middlewares/gadget/uploadPhoto"),
        (req,res,next) => {
            console.log(req.files);
        }
    );
}