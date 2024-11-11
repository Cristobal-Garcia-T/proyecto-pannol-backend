const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    rol: {
        type: String,
        required: true,
    },
    contrasena: {
        type: String,
        required: true
    },
    habilitado: {
        type: Boolean,
        default: true
    }
});

module.exports = model("Usuario", UsuarioSchema, "Usuarios");