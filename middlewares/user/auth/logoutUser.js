module.exports = (objectRepository) => {
    return (req,res,next) => {
        req.logout();
        next();
    }
}