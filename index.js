const { conexion } = require("./bd/conexion");
const express = require("express");
const cors = require("cors");

conexion();

const app = express();
const puerto = 3900;

console.log("App iniciada");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const rutas_productos = require("./rutas/productos");
const rutas_reportes = require("./rutas/reportes");
const rutas_solicitudes = require("./rutas/solicitudes");
const rutas_usuarios = require("./rutas/usuarios");

app.use("/productos", rutas_productos);
app.use("/solicitudes", rutas_solicitudes);
app.use("/usuarios", rutas_usuarios);
app.use("/reportes", rutas_reportes);

app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
});
