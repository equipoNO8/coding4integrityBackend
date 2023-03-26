const mysqlclient = require("../helpers/dbConnectionClient")

const uniqueInteger = () => {
    const prefix = new Date().getTime().toString(); // Obtener la fecha actual en milisegundos
    const randomNumber = Math.floor(Math.random() * 1000000); // Generar un número aleatorio de 0 a 999999
    return parseInt(prefix + randomNumber); // Concatenar el prefijo y el número aleatorio, y convertirlo en un entero
  }

function post(req, res){
    const {
        lugar,
        denuncia,
        folio = uniqueInteger(), 
        correo, 
        edad
    } = req.body;
    
    try
    {
        mysqlclient.connect(function (error){
            if(error){
                //
                console.log("Connection error")
                return res.status(500).json({
                    message: "INTERNAL SERVER ERROR"
                })
            }
        });
        const fecha = new Date().toISOString().slice(0, 10);
        const hora = new Date().toISOString().slice(11, 19);
        mysqlclient.query( `INSERT INTO denuncias (fecha, hora, denuncia, Correo, edad, Folios, lugar) VALUES (${fecha}, ${hora}, ${denuncia}, ${correo}, ${edad}, ${folio}, ${lugar};`, function(error){
            if(error)
            {
                return res.status(400).json({
                    message: "bad request"
                })
            }
        })
        
    }
    catch(error)
    {
        console.log(error)
        return res.status.json({
            message: "INTERNAL SERVER ERROR"
        })
    }
    finally
    {
        mysqlclient.end();
    }

}


module.exports = {
    post,
}