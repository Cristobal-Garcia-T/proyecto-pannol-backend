const validator = require("validator");

const validarNuevaSolicitud = (param) => {
    if (validator.isEmpty(param.Solicitante)) {
        throw new Error("Falta solicitante!!");
    }
    if (param.Producto.length < 1) {
        throw new Error("Falta producto!!");
    }
    if (param.RutSolicitante.length !== 9) {
        throw new Error("Rut invalido!!");
    }
}
const validarIdSolicitud = (id) => {
    if (validator.isEmpty(id)) {
        throw new Error("Id no entregada");
    }
}

module.exports = {
    validarNuevaSolicitud,
    validarIdSolicitud
};