const fs = require("fs");
const path = require("path");
const { validarProducto, validarIdProducto } = require("../util/validadorProductos");
const Producto = require("../modelos/productos");

//Crear producto POST
const crearProducto = async (req, res) => {
    const parametros = req.body;

    try {
        validarProducto(parametros);

        const producto = new Producto(parametros);
        await producto.save();

        return res.status(200).json({
            status: "éxito",
            producto,
            mensaje: "Producto creado con éxito!"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        })
    }
}

// Editar un producto existente PUT
const editarProducto = async (req, res) => {
    const productoId = req.params.id;
    const parametros = req.body;

    try {
        validarProducto(parametros);

        const productoActualizado = await Producto.findOneAndUpdate(
            { _id: productoId },
            parametros,
            { new: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            status: "éxito",
            producto: productoActualizado,
            mensaje: "Producto actualizado!"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al actualizar el producto",
            error
        });
    }
};

//Listar productos GET
const listarProductoId = async (req, res) => {
    let consulta = Producto.find({ nombre: req.params.nombre.toString() });

    let resultado = await consulta.sort({ Estado: -1 });
    if (!resultado || resultado.length <= 0) {
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado productos con el nombre: " + req.params.nombre.toString()
        });
    }
    return res.status(200).json({
        status: "éxito",
        reqParam: req.params,
        productos: resultado
    });
}

// Eliminar un producto DELETE
const borrarProducto = async (req, res) => {
    const productoId = req.params.id;

    try {
        validarIdProducto(productoId);

        const productoEliminado = await Producto.findOneAndDelete({ _id: productoId });

        if (!productoEliminado) {
            return res.status(404).json({
                status: "error",
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            status: "éxito",
            producto: productoEliminado,
            mensaje: "Producto eliminado"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al eliminar el producto",
            error
        });
    }
};

module.exports = {
    crearProducto,
    editarProducto,
    listarProductoId,
    borrarProducto
};
