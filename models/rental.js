const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const intervallumSchema = {
    kezdete: {
        type: Date
    },
    vege: {
        type: Date
    }
}

function checkIntervallum(v) {
    return v.kezdete < v. vege;
}

// Kölcsönzés séma
const rentalSchema = new Schema({
    foglalas: {
        type: intervallumSchema,
        validate: [checkIntervallum, "A foglalás kezdete kisebb kell legyen mint a vége"],
        required: true
    },
    kiadva: {
        type: intervallumSchema,
        validate: [checkIntervallum, "A foglalás kezdete kisebb kell legyen mint a vége"],
    },
    allapot: {
        type: String,
        default: 'Lefoglalva',
        required: true,
        enum: ['Lefoglalva', 'Kikölcsönözve', 'Visszahozva']
    },
    _kolcsonzo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    _eszkoz: {
        type: Schema.Types.ObjectId,
        ref: 'Gadget',
        required: true,
    },
    _komment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }
});

/**
 * Megkeressük hogy van e olyan másik foglalás az eszközre ami overlappol. Ha igen akkor nem megyünk tovább.
 */
rentalSchema.pre('save', function(next) {
    this.constructor.find({
        _eszkoz :  this._eszkoz,
        'foglalas.kezdete': {
            $lt: this.foglalas.vege
        },
        'foglalas.vege': {
            $gt: this.foglalas.kezdete
        }
    }, (err, result) => {
        if(err) throw err;
        if(result.length != 0) {
            return next({ logicError: true, msg: "Erre az időpontra már van foglalás!"});
        }
        else {
            return next();
        }
    })
});

const rentalModel = mongoose.model("Rental", rentalSchema);

module.exports = rentalModel;