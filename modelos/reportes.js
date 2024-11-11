const { Schema, model } = require("mongoose");

const ReporteSchema = Schema({

    detalles: {
        type: String,
        required: true,
    }
});

module.exports = model("Reporte", ReporteSchema, "Reportes");