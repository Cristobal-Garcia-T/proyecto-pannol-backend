const validator = require("validator");

const validarProducto = (param) => {
    if (validator.isEmpty(param.nombre)) {
        throw new Error("¡¡Falta el nombre del producto!!");
    }
    if (!validator.isLength(param.nombre, { min: 1, max: 50 })) {
        throw new Error("El nombre debe tener entre 1 y 50 caracteres.");
    }
    if (validator.isEmpty(param.stock.toString())) {
        throw new Error("¡¡Falta el stock del producto!!");
    }
    if (!validator.isInt(param.stock.toString(), { min: 1, max: 250 })) {
        throw new Error("El stock debe estar entre 1 y 250 unidades.");
    }
}

const validarIdProducto = (id) => {
    if (validator.isEmpty(id)) {
        throw new Error("ID del producto no entregado");
    }
}

module.exports = {
    validarProducto,
    validarIdProducto
};
