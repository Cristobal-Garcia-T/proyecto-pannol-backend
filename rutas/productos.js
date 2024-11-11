const express = require("express");
const ProductoControlador = require("../controladores/productos");
const router = express.Router();

router.post("/crear", ProductoControlador.crearProducto);
router.put("/editar/:id", ProductoControlador.editarProducto);
router.delete("/borrar/:id", ProductoControlador.borrarProducto);

module.exports = router;



