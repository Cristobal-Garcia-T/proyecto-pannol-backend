const { validarReporte, validarIdReporte } = require("../util/validadorReportes");
const Reporte = require("../modelos/reportes");

//Crear Reporte POST
const crearReporte = async (req, res) => {
    const parametros = req.body;

    try {
        validarReporte(parametros);

        const reporte = new Reporte(parametros);
        await reporte.save();

        return res.status(200).json({
            status: "éxito",
            Reporte,
            mensaje: "Reporte creado con éxito!"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        })
    }
}

// Listar Reportes
const listarReporte = async (req, res) => {

    try {
        let consulta = Reporte.find({});

        if (req.params.ultimos) {
            consulta.limit(req.params.ultimos);
        }

        let resultado = await consulta.sort({ fecha: -1 });

        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado Reportes!!"
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
            mensaje: "No se encuentran Reportes!!"
        });
    }
}

//Borrar Reporte
const borrarReporte = async (req, res) => {
    const reporteId = req.params.id;

    try {
        validarIdReporte(reporteId);

        const ReporteEliminado = await Reporte.findOneAndDelete({ _id: reporteId });

        if (!ReporteEliminado) {
            return res.status(404).json({
                status: "error",
                mensaje: "Reporte no encontrado"
            });
        }

        return res.status(200).json({
            status: "éxito",
            Reporte: ReporteEliminado,
            mensaje: "Reporte eliminado"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al eliminar el Reporte",
            error
        });
    }
};

module.exports  = {
    crearReporte,
    listarReporte,
    borrarReporte
}

