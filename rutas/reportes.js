const express = require("express");
const ReportesControlador = require("../controladores/reportes");
const router = express.Router();

router.post("/crearReporte", ReportesControlador.crearReporte);
router.put("/listarReporte/:id", ReportesControlador.listarReporte);
router.delete("/borrarReporte/:id", ReportesControlador.borrarReporte);

module.exports  = router;
