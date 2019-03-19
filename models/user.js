const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

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