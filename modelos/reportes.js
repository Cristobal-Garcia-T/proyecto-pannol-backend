const { Schema, model } = require("mongoose");

const ReporteSchema = Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        
    },
    detalles: {
        type: String,
        required: true,
    }
});

module.exports = model("Reporte", ReporteSchema, "reportes");