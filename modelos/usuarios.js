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
        id: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un correo válido']
    },
    rol: {
        type: String,
        required: true,
    },
    contrasena: {
        type: String,
        required: true
    }
});

module.exports = model("Usuario", UsuarioSchema, "Usuarios");