const express = require("express");
const multer = require("multer");
const usuariosControlador = require("../controladores/usuarios");

const router = express.Router();

const almacenamiento = multer.diskStorage({
    filename: function(req, file, cb){
        cb(null, "usuario" + Date.now() + file.originalname);
    }
})
const subidas = multer({storage: almacenamiento});

router.post("/crear", usuariosControlador.crear);

module.exports = router;
