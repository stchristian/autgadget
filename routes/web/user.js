const express = require('express');
const router = express.Router();

const getGadgetListMW = require('../../middlewares/gadget/getGadgetList');
const renderViewMW = require('../../middlewares/renderView');
const getUserListMW = require('../../middlewares/user/getUserList');
const getUserMW = require('../../middlewares/user/getUser');
const updateUserMW = require('../../middlewares/user/updateUser');
const ensureAdminMW = require('../../middlewares/user/auth/ensureAdmin');



module.exports = function(objectRepository) {
    router.get('/info', (req,res,next) => {
        res.render('info') ;
    })
    
    router.get('/dashboard', (req,res) => {
        res.render('dashboard');
    });

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

    return router;
}


// router.get('/users', (req,res, next) => {
//     felhasznaloModel.find()
//         .then(felhasznalok => {
//             res.render('users', { felhasznalok });
//         })
//         .catch( err=> {
//             console.log(err);
//         })
// });

// router.get('/create', (req,res,next) => {

//     res.render('adduser', { 
//         success_msg: req.flash("success_msg"),
//         errors: req.flash("errors")
//     });
// });

// router.post('/create', (req,res,next) => {
//     const ujFelhasznalo = new felhasznaloModel(req.body);

//     ujFelhasznalo.save()
//         .then(user => {
//             req.flash("success_msg", "Felhasználó sikeresen hozzáadva!");
//             res.redirect("/user/create");
//         })
//         .catch(error => {
//             if(error.name === "ValidationError") {
//                 let errors = [];
//                 for(let key in error.errors) {
//                     let message = error.errors[key].message;
//                     errors.push({ message: message });
//                     console.log(message);
//                 }
//                 req.flash("errors", errors);
//                 res.redirect("/user/create");
//             }
//         });
// });
