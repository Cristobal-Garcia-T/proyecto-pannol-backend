const validator = require("validator");

const validarNuevaSolicitud = (parametros) => {
    if (validator.isEmpty(parametros.Solicitante)) {
        throw new Error("Falta solicitante!!");
    }
    if (validator.isEmpty(parametros.Producto)) {
        throw new Error("Falta producto!!");
    }
}

module.exports = {
    validarNuevaSolicitud
};