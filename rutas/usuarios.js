const express = require("express");
const usuariosControlador = require("../controladores/usuarios");

const router = express.Router();


router.post("/crear", usuariosControlador.crear);
router.get("/listar", usuariosControlador.listar);
router.get("/listar/:rut", usuariosControlador.listarRut);
router.put("/estado/:rut",usuariosControlador.cambiarEstado);

module.exports = router;
