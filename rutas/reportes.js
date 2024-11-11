const express = require("express");
const ReportesControlador = require("../controladores/reportes");
const router = express.Router();

router.post("/crear", ReportesControlador.crearReporte);
router.get("/listar/:id", ReportesControlador.listarReporte);
router.delete("/borrar/:id", ReportesControlador.borrarReporte);

module.exports  = router;
