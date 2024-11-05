const { Schema, model } = require("mongoose");

const SolicitudSchema = Schema({
    _id:{
        type: String,
        required: true
    }
});

module.exports = model("Solicitud", SolicitudSchema);
