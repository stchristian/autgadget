const express = require('express');
const router = express.Router();

const getGadgetListMW = require('../../middlewares/gadget/getGadgetList');
const deleteUserMW = require('../../middlewares/user/deleteUser');
const renderViewMW = require('../../middlewares/renderView');
const getUserListMW = require('../../middlewares/user/getUserList');
const getUserMW = require('../../middlewares/user/getUser');
const updateUserMW = require('../../middlewares/user/updateUser');
const ensureAdminMW = require('../../middlewares/user/auth/ensureAdmin');

module.exports = function(objectRepository) {
    router.get('/info', (req,res,next) => {
        res.render('info') ;
    })
    
    router.use('/list',
        ensureAdminMW(objectRepository),
    );

    router.get('/list',
        getUserListMW(objectRepository),
        renderViewMW(objectRepository, 'user_table')
    );
    
    router.get('/list/:userId/edit',
        getUserMW(objectRepository),
        getUserListMW(objectRepository),
        renderViewMW(objectRepository, 'user_table')
    );

    router.post('/list/:userId/edit',
        getUserMW(objectRepository),
        updateUserMW(objectRepository),
        getUserListMW(objectRepository),
        renderViewMW(objectRepository, 'user_table')
    )

    router.get('/:userId/delete',
        deleteUserMW(objectRepository),
        (req,res,next) => {
            res.redirect('/user/list');
        }
    );

    return router;
}
