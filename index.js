const { conexion } = require("./bd/conexion");
const express = require("express");
const cors = require("cors");

console.log("App iniciada");

conexion();

const app = express();
const puerto = 3900;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const rutas_productos = require("./rutas/productos");
const rutas_reportes = require("./rutas/reportes");
const rutas_solicitudes = require("./rutas/solicitudes");
const rutas_usuarios = require("./rutas/usuarios");

app.use("/productos", rutas_productos);
app.use("/solicitudes", rutas_solicitudes);

app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
});
