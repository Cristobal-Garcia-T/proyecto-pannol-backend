const fs = require("fs");
const path = require("path");
const { validarSolicitud, validarIdSolicitud } = require("../util/validador");
const Solicitud = require("../modelos/solicitudes");

const crear = (req, res) => {

    let parametros = req.body;

    /*try {
        validarSolicitud(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }*/

    const solicitud = new Solicitud(parametros);

    solicitud.save();

    return res.status(200).json({
        status: "éxito",
        solicitud: parametros,
        mensaje: "Solicitud creada con éxito!!"
    })

}

const listar = async (req, res) => {

    try {
        let consulta = Solicitud.find({});

        if (req.params.ultimos) {
            consulta.limit(req.params.ultimos);
        }

        let resultado = await consulta.sort({ fecha: -1 });

        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos!!"
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
            mensaje: "No se encuentran artículos!!"
        });
    }
}

module.exports = {
    listar,
    crear,
}