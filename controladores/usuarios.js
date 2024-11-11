const fs = require("fs");
const Usuario = require("../modelos/usuarios");
const {validarUsuario, validarRut} = require("../util/validadorUsuarios");
const Solicitud = require("../modelos/solicitudes");

const crear = (req, res) => {

    let parametros = req.body;
    try {
        validarUsuario(parametros);
        const usuario = new Usuario(parametros);

        usuario.save();

        return res.status(200).json({
            status: "éxito",
            usuario: parametros,
            mensaje: "Usuario creado con éxito!!"
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        })
    }
};

const listar = async (req, res) => {

    try {
        let consulta = Usuario.find({});

        if (req.params.ultimos) {
            consulta.limit(req.params.ultimos); // Limitar número de usuarios si se envía el parámetro
        }

        let resultado = await consulta.sort({ fecha: -1 }); // Ordenar por fecha (más recientes primero)

        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado usuarios!!"
            });
        } else {
            return res.status(200).send({
                status: "éxito",
                contador: resultado.length,
                resultado
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se encuentran usuarios!!"
        });
    }
};

// Listar un solo usuario por ID
const listarRut = async (req, res) => {

    try {
        validarRut(req.params.rut.toString());

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        });
    }

    try {
        let resultado = await Usuario.find({rut: req.params.rut.toString()});
        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el usuario"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                resultado
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha encontrado el usuario"
        });
    }
};

const cambiarEstado = async (req, res) => {
    try {
        validarRut(req.params.rut.toString());

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        });
    }
    let resultado = await Usuario.findOneAndUpdate({ rut: req.params.rut.toString()},[{ $set: { habilitado: { $not: "$habilitado" } } }], { new: true });

    if (!resultado) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al actualizar solicitud"
        })
    }
    return res.status(200).json({
        status: "éxito",
        Solicitud: resultado,
        mensaje: "Estado cambiado con éxito"
    })
}


module.exports = {
    crear,
    listar,
    listarRut,
    cambiarEstado
};
