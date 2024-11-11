const validator = require("validator");
const res = require("express/lib/response");

const validarUsuario = (param) => {
    if (validator.isEmpty(param.nombre)) {
        throw new Error("Falta nombre");
    }
    validarRut(param.rut)
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

const validarRut = (rut) => {
    if (validator.isEmpty(rut)) {
        throw new Error("Falta rut");
    }
    if (rut.length !== 9) {
        throw new Error("Rut invalido");
    }
    let sum = rut[7]*2 + rut[6]*3 + rut[5]*4 + rut[4]*5 + rut[3]*6 + rut[2]*7 + rut[1]*2 + rut[0]*3;
    let resto = sum%11;
    let verificador = 11 - resto;
    if ((verificador === 11 && rut[8]==="0") || (verificador === 10 && rut[8]==="k") || (verificador.toString() === rut[8])) {
        return;
    }
    throw new Error("Rut invalido por algoritmo " + sum + " " + resto + " " + verificador + " " + rut[8]);
}

module.exports = {
    validarUsuario,
    validarRut
}