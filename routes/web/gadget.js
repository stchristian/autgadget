const express = require('express');
const router = express.Router();

const getGadgetListMW = require('../../middlewares/gadget/getGadgetList');
const getGadgetMW = require('../../middlewares/gadget/getGadget');
const getRentalsByGadget = require('../../middlewares/rental/getRentalsByGadget');
const createGadgetMW = require('../../middlewares/gadget/createGadget');
const uploadPhotoMW = require('../../middlewares/gadget/uploadPhoto');
const renderViewMW = require('../../middlewares/renderView');

const createCommentMW = require('../../middlewares/comment/createComment');
const addCommentMW = require('../../middlewares/gadget/addComment');


module.exports = function(objectRepository) {

    router.get('/create', 
        renderViewMW(objectRepository, 'gadget_create')
    );
    
    router.post('/create', 
        uploadPhotoMW,
        createGadgetMW(objectRepository),
        renderViewMW(objectRepository, 'gadget_create')
    );
    
    router.get('/list',
        getGadgetListMW(objectRepository),
        renderViewMW(objectRepository, 'gadget_list')
    )

    router.get('/details/:gadgetId',
        getGadgetMW(objectRepository),
        renderViewMW(objectRepository, 'gadget_details')
    );

    router.get('/:gadgetId/edit',
        getGadgetMW(objectRepository),
        renderViewMW(objectRepository, 'gadget_create')
    );

    router.post('/:gadgetId/comment',
        getGadgetMW(objectRepository),
        createCommentMW(objectRepository),
        addCommentMW(objectRepository),
        (req,res) => {
            res.redirect(`/gadget/details/${req.params.gadgetId}`);
        }
    );


    return router;
}