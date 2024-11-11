const express = require("express");
const SolicitudControlador = require("../controladores/solicitudes");

const router = express.Router();

router.post("/crear", SolicitudControlador.crear);
router.get("/listar", SolicitudControlador.listar);
router.get("/listar/:solicitante", SolicitudControlador.listarSolicitante);
router.delete("/borrar/:id",SolicitudControlador.borrar);
router.put("/editar/:id",SolicitudControlador.editar);

module.exports = router;