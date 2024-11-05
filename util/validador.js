const validator = require("validator");

const validarSolicitud = (parametros) => {

    let validar_titulo = !validator.isEmpty(parametros.titulo) &&
        validator.isLength(parametros.titulo, { min: 5, max: undefined });
    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if (!validar_titulo || !validar_contenido) {
        throw new Error("No se ha validado la información !!");
    }
}

const validarIdSolicitud = (id) => {
    let validar_id = !validator.isEmpty(id) &&
        validator.isLength(id, { min: 24, max: 24 });

    if (!validar_id) {
        throw new Error("No se ha validado el ID!!");
    }
}