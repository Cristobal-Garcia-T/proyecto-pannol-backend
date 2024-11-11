const validator = require("validator");

const validarUsuario = (param) => {
    if (validator.isEmpty(param.nombre)) {
        throw new Error("Falta nombre");
    }
    if (validator.isEmpty(param.rut)) {
        throw new Error("Falta rut");
    }
    if (validator.isEmpty(param.correo)) {
        throw new Error("Falta correo");
    }
    if (validator.isEmpty(param.rol)) {
        throw new Error("Falta rol");
    }
    if (validator.isEmpty(param.contrasena)) {
        throw new Error("Falta contraseña");
    }
}