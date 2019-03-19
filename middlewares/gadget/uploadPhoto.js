const multer = require('multer');
const photosDir = require('../../config/keys').gadgetPhotosDirectory;

const storage = multer.diskStorage({
    destination: photosDir,
    filename: function(req,file,cb) {
        cb(null, new Date().toISOString() + file.originalname); 
    }
});

const fileFilter = (req, file, cb) => {
    if( file.mimetype === "image/jpeg" || file.mimetype === "image/png" ) {
        cb(null,true);
    }
    else {
        cb(null,false);
    }
};

// Multer configuration, max 5MB
const upload = multer({ 
    storage : storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }, 
    fileFilter: fileFilter
});
 
/**
 * Ez egy olyan middleware ami max 5 képet fog beolvasni a gadgetphotos mappába.
 * Egy kép max 5MB lehet.
 */
module.exports = upload.array('kepek', 5);