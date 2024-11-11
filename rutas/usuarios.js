const express = require("express");
const usuariosControlador = require("../controladores/usuarios");

const router = express.Router();


router.post("/crear", usuariosControlador.crear);

module.exports = router;
