const validator = require("validator")


const validarIdReporte = (id) => {
    if (validator.isEmpty(id)) {
        throw new Error("ID del Reporte no entregado");
    }
}

const validarReporte = (param) => {
    if (validator.isEmpty(param.detalles)) {
        throw new Error("Falta texto!!");
    }
}

module.exports = {
    validarIdReporte,
    validarReporte
}