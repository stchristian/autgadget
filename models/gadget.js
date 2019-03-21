const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const rentalModel = require('./rental');

const Schema = mongoose.Schema;

// Eszköz séma
const gadgetSchema = new Schema({
    nev: {
        type: String,
        required: [true, "Eszköz nevének megadása kötelező."]
    },
    sorszam: {
        type: Number,
        required: [true, "Eszköz sorszámának megadása kötelező"],
        unique: true
    },
    qrkod: {
        type: String, 
        required: [true, "Eszköz qr kódjának megadása kötelező"],
        unique: true
    },
    leiras: {
        type: String,
        required: [true, "Eszköz leírásának megadása kötelező."],
    },
    tartozekok: [{
        type: String,
        default: []
    }],
    _felelos: { 
        type: Schema.Types.ObjectId, 
        ref : 'User',
        required : true,
    },
    kommentek:[{
        type : Schema.Types.ObjectId, 
        ref : 'Comment',
        default: []
    }],
    hozzaadas_datuma: { 
        type : Date,
        required: true,
        default: Date.now 
    },
    tagek: [{
        type: String,
        default: []
    }],
    kepek: [{
        type: String,
        default: []
    }],
});

gadgetSchema.methods.checkAllapot = async function() {
    rentals = await rentalModel.find({ _eszkoz : this._id });  
    if(rentals) {
        const now = new Date();
        for(let i in rentals) {
            if( now.getTime() <= rentals[i].foglalas.vege.getTime()
                && now.getTime() >= rentals[i].foglalas.kezdete.getTime()
            )
            {
                return 'Foglalt';
            }
        }
    }
    return 'Szabad';
};

gadgetSchema.index({
    nev: 'text',
    leiras: 'text'
}, {
    weights: {
        nev: 5,
        leiras: 1
    }
});

gadgetSchema.plugin(uniqueValidator, { message : "Ilyen sorszámmal már létezik eszköz"});

const gadgetModel = mongoose.model('Gadget', gadgetSchema);
module.exports = gadgetModel;