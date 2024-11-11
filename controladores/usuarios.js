const fs = require("fs");
const Usuario = require("../modelos/usuarios");

const crear = (req, res) => {

    let parametros = req.body;

    try {
        validarUsuario(parametros); // Función de validación para usuarios

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    const usuario = new Usuario(parametros);

    usuario.save();

    return res.status(200).json({
        status: "éxito",
        usuario: parametros,
        mensaje: "Usuario creado con éxito!!"
    });
};

// Listar usuarios
const listar = async (req, res) => {

    try {
        let consulta = Usuario.find({});

        if (req.params.ultimos) {
            consulta.limit(req.params.ultimos); // Limitar número de usuarios si se envía el parámetro
        }

        let resultado = await consulta.sort({ fecha: -1 }); // Ordenar por fecha (más recientes primero)

        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado usuarios!!"
            });
        } else {
            return res.status(200).send({
                status: "éxito",
                contador: resultado.length,
                resultado
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se encuentran usuarios!!"
        });
    }
};

// Listar un solo usuario por ID
const listar_uno = async (req, res) => {
    // Recoger ID del usuario de la URL
    let id = req.params.id;

    // Validar ID
    try {
        validarIdUsuario(id); // Función de validación del ID

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "ID con formato incorrecto"
        });
    }

    try {
        // Buscar el usuario
        let resultado = await Usuario.findById(id);
        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el usuario"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                resultado
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha encontrado el usuario"
        });
    }
};

// Borrar usuario
const borrar = async (req, res) => {
    // Recoger ID del usuario de la URL

    try {
        let usuarioId = req.params.id;
        validarIdUsuario(usuarioId); // Validar el ID del usuario
        let resultado = await Usuario.findOneAndDelete({ _id: usuarioId });

        if (!resultado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al borrar el usuario"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                usuario: resultado,
                mensaje: "Usuario borrado"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido borrar el usuario, posiblemente el formato de ID es incorrecto!!"
        });
    }
};

// Editar usuario
const editar = async (req, res) => {
    // Recoger ID del usuario a editar
    let usuarioId = req.params.id;

    // Recoger datos del cuerpo de la solicitud (PUT)
    let parametros = req.body;

    // Validar datos
    try {
        validarUsuario(parametros); // Validar los nuevos datos
        // Buscar y actualizar usuario
        let resultado = await Usuario.findOneAndUpdate({ _id: usuarioId }, req.body, { new: true });

        if (!resultado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar el usuario"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                usuario: resultado,
                mensaje: "Usuario actualizado!!"
            });
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }
};

// Subir imagen de perfil de usuario
const subir = async (req, res) => {

    try {
        // Comprobar que se ha subido un archivo
        if (!req.file && !req.files) {
            return res.status(404).json({
                status: "error",
                mensaje: "Petición inválida"
            });
        }

        // Nombre del archivo
        let archivo = req.file.originalname;

        // Obtener extensión del archivo
        let archivo_split = archivo.split("\."); // nombredearchivo.jpg
        let extension = archivo_split[1];

        // Comprobar si la extensión es correcta
        if (extension != "png" && extension != "jpg" &&
            extension != "jpeg" && extension != "gif") {

            // Borrar archivo si la extensión no es válida
            fs.unlink(req.file.path, (error) => {
                return res.status(400).json({
                    status: "error",
                    mensaje: "Imagen inválida"
                });
            });
        } else {
            // Recoger ID del usuario a editar
            let usuarioId = req.params.id;

            // Buscar y actualizar el usuario con el nombre del archivo
            let resultado = await Usuario.findOneAndUpdate({ _id: usuarioId }, { imagen: req.file.filename }, { new: true });

            if (!resultado) {
                return res.status(500).json({
                    status: "error",
                    mensaje: "Error al actualizar"
                });
            } else {
                // Devolver respuesta con el usuario actualizado y el archivo
                return res.status(200).json({
                    status: "éxito",
                    usuario: resultado,
                    fichero: req.file
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error al actualizar!"
        });
    }
};

// Buscar usuarios
const buscador = async (req, res) => {
    // Obtener el término de búsqueda
    let busqueda = req.params.busqueda;

    // Buscar usuarios que coincidan con el término en nombre o email
    let consulta = Usuario.find({
        "$or": [
            { "nombre": { "$regex": busqueda, "$options": "i" } },
            { "email": { "$regex": busqueda, "$options": "i" } },
        ]
    });

    let resultado = await consulta.sort({ fecha: -1 });

    if (!resultado || resultado.length <= 0) {
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado usuarios"
        });
    } else {
        return res.status(200).json({
            status: "éxito",
            usuarios: resultado
        });
    }
};

module.exports = {
    crear,
    listar,
    listar_uno,
    borrar,
    editar,
    subir,
    buscador
};
