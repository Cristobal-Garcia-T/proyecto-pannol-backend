const Producto = require("../modelos/Producto"); //Hay que crear el modelo para importarlo

// Crear producto
const crearProducto = async (req, res) => {
    let parametros = req.body;

    try {
        const producto = new Producto(parametros);
        await producto.save();

        return res.status(200).json({
            status: "éxito",
            producto,
            mensaje: "Producto creado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "No se pudo crear el producto"
        });
    }
};

const editarProducto = async (req, res) => {
    let productoId = req.params.id;
    let parametros = req.body;

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            productoId,
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
            mensaje: "Producto actualizado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "No se pudo actualizar el producto"
        });
    }
};

const eliminarProducto = async (req, res) => {
    let productoId = req.params.id;

    try {
        const productoEliminado = await Producto.findByIdAndDelete(productoId);

        if (!productoEliminado) {
            return res.status(404).json({
                status: "error",
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            status: "éxito",
            producto: productoEliminado,
            mensaje: "Producto eliminado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "No se pudo eliminar el producto"
        });
    }
};

module.exports = {
    crearProducto,
    editarProducto,
    eliminarProducto
};
