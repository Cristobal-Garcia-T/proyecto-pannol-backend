const express = require("express");
const multer = require("multer");
const SolicitudControlador = require("../controladores/solicitudes");

const router = express.Router();

const almacenamiento = multer.diskStorage({
    filename: function(req, file, cb){
        cb(null, "solicitud" + Date.now() + file.originalname);
    }
})

const subidas = multer({storage: almacenamiento});

router.post("/crearSolicitud", SolicitudControlador.crear);
router.get("/listarSolicitudes", SolicitudControlador.listar);

module.exports = router;