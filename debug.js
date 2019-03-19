module.exports = {
    logInfoMW : (req,res,next) => {
        console.log(
`_____________________________________
NEW HTTP REQUEST
From: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}
Route: ${req.originalUrl}
Method: ${req.method}
-------------------------------------`);
        next();
    },
};