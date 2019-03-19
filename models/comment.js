const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Komment séma
const commentSchema = new Schema({
    szoveg: {
        type: String,
        maxlength: [500, "A komment megengedett mérete max 500 karakter."],
        required: [true, "Kötelező a szöveg megadása"]
    },
    hozzaadas_datuma: {
        type: Date,
        default: Date.now
    },
    _szerzo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
    
const commentModel = mongoose.model("Komment", commentSchema);

module.exports = commentModel;