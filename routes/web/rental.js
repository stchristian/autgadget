const express = require('express');
const router = express.Router();

const getGadgetMW = require('../../middlewares/gadget/getGadget');
const createRentalMW = require('../../middlewares/rental/createRental');
const getRentalListMW = require('../../middlewares/rental/getRentalList');
const getRentalByUserMW = require('../../middlewares/rental/getRentalByUser');
const renderViewMW = require('../../middlewares/renderView');


module.exports = function(objectRepository) {

    router.post('/create/:gadgetId',
        getGadgetMW(objectRepository),
        createRentalMW(objectRepository),
        (req,res) => {
            res.redirect(`/gadget/details/${req.params.gadgetId}`);
        }
        // renderViewMW(objectRepository, 'gadget_details')
    );

    router.get('/list',
        getRentalListMW(objectRepository),
        renderViewMW(objectRepository, 'rental_list')
    );

    router.get('/myrentals',
        getRentalByUserMW(objectRepository),
        renderViewMW(objectRepository, 'rental_list')
    );

    return router;
}