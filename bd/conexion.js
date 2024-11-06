const mongoose = require("mongoose");

const conexion = async() => {

    try {

        await mongoose.connect("mongodb+srv://Cristobal-Garcia-T:CGT64@proyectopannol.dcs6l.mongodb.net/ProyectoPannol?retryWrites=true&w=majority");


        console.log("Conectado correctamente a la base de datos en Atlas");

    } catch(error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos!!");
    }

}

module.exports = {
    conexion
}