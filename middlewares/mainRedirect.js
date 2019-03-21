module.exports = (objectRepository) => {
    return (req, res, next) => {
        if(req.isAuthenticated()) {
            res.redirect('/gadget/list');
        }
        else {
            res.redirect('/login');
        }
    }
}