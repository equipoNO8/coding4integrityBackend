const mysqlclient = require("../helpers/dbConnectionClient")

function post(req, res){
    const {
        lugar,
        denuncia,
        fecha, 
        hora, 
        correo, 
        edad
    } = req.body;
    
    try
    {
        mysqlclient.connect(function (error){
            if(error){
                //
                console.log("Connection error")
                console.log(error)
                return res.status(500).json({
                    message: "INTERNAL SERVER ERROR"
                })
            }
        });

        // mysqlclient.query( `INSERT INTO Denuncia (lugar, denuncia, fecha, hora, correo, edad) VALUES (${lugar}, ${denuncia}, ${fecha}, ${hora}, ${correo}, ${edad};`, function(error, results, fields){
        //     if(error)
        //     {
        //         return res.status(400).json({
        //             message: "bad request"
        //         })
        //     }
        // })
        mysqlclient.query( `SHOW * FROM denuncias;`, function(error, results, fields){
            if(error)
            {
                return res.status(400).json({
                    message: "bad request"
                })
            }
            console.log(results)
            console.log(fields)
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