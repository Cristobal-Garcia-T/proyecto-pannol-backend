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

router.post("/crear", SolicitudControlador.crear);
router.get("/listar", SolicitudControlador.listar);
router.get("/listar/:Solicitante", SolicitudControlador.listarSolicitante);
router.delete("/borrar/:id",SolicitudControlador.borrar);

module.exports = router;