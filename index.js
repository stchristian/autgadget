//Beolvassa a .env fájlt és beállítja az ott definiált változókat
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('./models/db');
const bodyParser = require('body-parser');
const expressLayouts = require("express-ejs-layouts");
const flash = require('connect-flash');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid');
const dateFormat = require('./generic/dateFormat');

const debug = require('./debug');
const passport = require('./passport');



const app = express();

//Alkalmazás szintű változók az EJS fájlok részére
app.locals.dateFormat = dateFormat;

// ObjectID-s varázslás , csak hogy tudjuk hogy működik
// let ObjectID = mongoose.Types.ObjectId;
// var id = new ObjectID();
// console.log(id.toHexString());
// console.log(id.getTimestamp());

// Set view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(debug.logInfoMW);

app.use('/uploads', express.static("uploads"));
app.use('/gadgetphotos', express.static("gadgetphotos"));
app.use(express.static('public'));
app.use(session({
    genid: (req) => {
        console.log('MW::express-session');
        console.log('current session: ' + req.sessionID);
        const id = uuid();
        console.log(`Generated uuid: ${id}`)
        return id;
    },
    store: new FileStore(),
    secret: 'myfriendboy',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/route_config')(app);

// app.get('/uuid', (req,res) => {
//     //console.log(req);
//     const u = uuid();
//     res.send("UUID: " + u);
// });

// app.get('/test', (req,res) => {
//     console.log('MW::Route handler for /test');
//     console.log(req.sessionID);
//     res.send('You requested /test!');
// })

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

//A nodemon miatt kell
process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); })