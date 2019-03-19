const express = require('express');
const router = express.Router();

const getGadgetMW = require('../../middlewares/gadget/getGadget');
const createRentalMW = require('../../middlewares/rental/createRental');
const getRentalListMW = require('../../middlewares/rental/getRentalList');
const renderViewMW = require('../../middlewares/renderView');


module.exports = function(objectRepository) {

    router.post('/create/:gadgetId',
        getGadgetMW(objectRepository),
        createRentalMW(objectRepository),
        (req,res) => {
            res.redirect('/gadget/list');
        }
        //renderViewMW(objectRepository, 'gadget_list')
    );

    router.get('/list',
        getRentalListMW(objectRepository),
        renderViewMW(objectRepository, 'rental_list')
    );

    return router;
}