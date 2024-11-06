const express = require("express");
const ProductoControlador = require("../controladores/productos");

const router = express.Router();

// Definir la ruta para crear productos
router.post("/crear", ProductoControlador.crearProducto);
router.put("/editar/:id", ProductoControlador.editarProducto);
router.delete("/borrar/:id", ProductoControlador.borrarProducto);

module.exports = router;



