var pool = require('../functions/db');

function controladorIngressante(){

}

controladorIngressante.prototype.setIngressanteAprovado = function(ID){
    var query = "UPDATE INGRESSO SET SIT_ACEITACAO=1 WHERE NUM_INSCRICAO = " + ID + ";";

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        //console.log('entrou!');
        connection.query(query, function(err, result){
            connection.release();
            if (err) {
                throw err;
            }
        });
        connection.on('error', function(err) {
            throw err;
        });
    });
};

module.exports = controladorIngressante;