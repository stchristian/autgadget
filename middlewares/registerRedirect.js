module.exports = (objectRepository) => {
    return (req, res, next) => {
        if(typeof res.locals.newUser !== 'undefined') {
            res.redirect('/login');
        }
        else {
            res.render('register');
        }
    }
}
