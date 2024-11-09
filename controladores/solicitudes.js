const fs = require("fs");
const path = require("path");
const {validarNuevaSolicitud} = require("../util/validador");
const Solicitud = require("../modelos/solicitudes");

const crear = (req, res) => {

    let parametros = req.body;

    try {
        validarNuevaSolicitud(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        });
    }

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

const listarSolicitante  = async (req, res) => {
    let consulta = Solicitud.find({Solicitante : req.params.Solicitante.toString()});

    let resultado = await consulta.sort({ Estado: -1 });
    if (!resultado || resultado.length <= 0) {
        return res.status(404).json({
            status: "error",
            mensaje: ["No se han encontrado artículos", req.params]
        });
    }
    return res.status(200).json({
        status: "éxito",
        Solicitud: resultado
    });
}





module.exports = {
    listar,
    crear,
    listarSolicitante
}