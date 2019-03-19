const express = require('express');
const router = express.Router();

const getGadgetListMW = require('../../middlewares/gadget/getGadgetList');
const getGadgetMW = require('../../middlewares/gadget/getGadget');
const createGadgetMW = require('../../middlewares/gadget/createGadget');
const uploadPhotoMW = require('../../middlewares/gadget/uploadPhoto');
const renderViewMW = require('../../middlewares/renderView');


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

    router.get('/:gadgetId/edit',
        getGadgetMW(objectRepository),
        renderViewMW(objectRepository, 'gadget_create')
    );


    return router;
}