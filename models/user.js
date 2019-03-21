const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const transporter = require('../config/email');

const Schema = mongoose.Schema;

// Felhasználó séma
const userSchema = new Schema({
    vezeteknev:{
        type: String,
        required: [true, "Vezetéknév megadása kötelező"],
    },
    keresztnev:{
        type: String,
        required: [true, "Keresztnév megadása kötelező"],
    },
    email:{
        type: String,
        required: [true, "Email cím megadása kötelező"],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email cím nem megfelelő formátumú"],
        unique: true
    },
    jelszo: {
        type: String,
        required: [true, "Jelszó megadása kötelező"],
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    eszkozfelelos:{
        type: Boolean,
        required: true,
        default: false
    },
    telefonszam: {
        type: String,
        required: [true, "Telefonszám megadása kötelező."],
        match: [/^[+]36 ?[\/(]?[0-9]{1,2}[\/)]? ?[0-9]{3}-?[0-9]{3,4}$/, "Telefonszám nem megfelelő formátumú"]
    },
    reg_datum: {
        type: Date,
        default: Date.now
    }
});

userSchema.virtual('teljesNev').get(function() {
    return `${this.vezeteknev} ${this.keresztnev}`;
})

userSchema.plugin(uniqueValidator, { message: "Ilyen email címmel már van regisztrálva felhasználó" });

// A loginhoz használjuk, lehasheli a jelszót és összeveti az adatbázisban lévővel
userSchema.methods.comparePassword = function(jelszo, cb) {
    bcrypt.compare(jelszo, this.jelszo, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


userSchema.methods.sendRentalEmail = function(rent) {
    let emailAddress = this.email;

    rent.populate("_eszkoz _kolcsonzo", function(err, rental) {
        if(err)
        {
            console.log(err);
        }
        else {
            let mailOptions = {
                from: `"AUTGADGET" <${process.env.MAIL_USER}>`,
                to: emailAddress,
                subject: `Eszközkölcsönzés`,
                html: `
                <h1>Új kölcsönzés érkezett eszközére!</h1>
                <h3>Adatok:</h3>
                <p>
                    Eszköz: ${rental._eszkoz.nev}<br>
                    Kölcsönző neve: ${rental._kolcsonzo.teljesNev}<br>
                    Kölcsönző telefonszáma ${rental._kolcsonzo.telefonszam}<br>
                    Kölcsönző email címe: ${rental._kolcsonzo.email}<br>
                    Kölcsönzés kezdete: ${rental.foglalas.kezdete}<br>
                    Kölcsönzés vége: ${rental.foglalas.vege}<br>
                </p>
                `
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log("Sikertelen email küldés: " + err);
                }
                else {
                    console.log("Email sikeresen elküldve!");
                }
            });
        }
    })
};

const SALT_WORK_FACTOR = 10;

//Jelszo hashelese adatbazisba mentes elott, ha uj vagy valtozott
userSchema.pre('save', function(next){
    let user = this;

    if (!user.isModified('jelszo')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.jelszo, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.jelszo = hash;
            next();
        });
    });
});

userSchema.index({'$**': 'text'});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;