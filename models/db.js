const mongoose = require('mongoose');
const uri = require('../config/keys').mongoURI;

//Csatlakozás az adatbázishoz
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true})
    .then( () => {
        console.log('MongoDB connected...');
    })
    .catch( err => {
        console.log(err);
    }
); 

module.exports = mongoose;