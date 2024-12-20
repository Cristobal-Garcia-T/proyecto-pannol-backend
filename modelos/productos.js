const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    imagen: {
        type: String,
        default: "default.png"
    }
});

module.exports = model("Producto", ProductoSchema, "Productos");
