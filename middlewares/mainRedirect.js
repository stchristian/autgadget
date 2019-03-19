module.exports = (objectRepository) => {
    return (req, res, next) => {
        if(req.isAuthenticated()) {
            res.redirect('/user/dashboard');
        }
        else {
            res.redirect('/login');
        }
    }
}