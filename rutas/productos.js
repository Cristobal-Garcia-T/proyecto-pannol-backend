const express = require("express");
const ProductoControlador = require("../controladores/productos");
const router = express.Router();

router.post("/crearProductos", ProductoControlador.crearProducto);
router.put("/editarProductos/:id", ProductoControlador.editarProducto);
router.get("/listar", ProductoControlador.listarProducto);
router.delete("/borrarProductos/:id", ProductoControlador.borrarProducto);

module.exports = router;



