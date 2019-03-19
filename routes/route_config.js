module.exports = (app) => {
    require('./web/outside')(app);
    require('./web/inside')(app);
};