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

const rentalModel = mongoose.model("Rental", rentalSchema);

module.exports = rentalModel;