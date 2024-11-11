const express = require("express");
const usuariosControlador = require("../controladores/usuarios");

const router = express.Router();


router.post("/crear", usuariosControlador.crear);
router.get("/listar", usuariosControlador.listar);

module.exports = router;
