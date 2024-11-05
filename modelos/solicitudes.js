const { Schema, model } = require("mongoose");

const SolicitudesSchema = Schema({
    Solicitante: {
        type: String,
        required: true
    },
    Producto: {
        type: String,
        required: true
    },
    Emision: {
        type: Date,
        default: Date.now
    },
    
    Vencimiento: {
        type: Date,
        default: function() {
            let fechaVencimiento = new Date(this.Emision);
            fechaVencimiento.setDate(fechaVencimiento.getDate() + 14);
            return fechaVencimiento;
        }
    },
    Estado: {
        type: String,
        required: true
    }
});

module.exports = model("Solicitud", SolicitudesSchema, "Solicitudes");