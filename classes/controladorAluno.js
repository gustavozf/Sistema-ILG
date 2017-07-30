var pool = require('../functions/db');

function controladorAluno(){

}

controladorAluno.prototype.mudarTurma = function (num_inscricao, curso, turma) {
    var query = "UPDATE SALAS SET SCOD_CURSO=" + curso +", SCOD_TURMA="+
                    turma+" WHERE SNUM_INSCRICAO = "+num_inscricao;
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
            return 0;
        }
        //console.log('entrou!');
        connection.query(query, function(err, result){
            connection.release();
            if (err) {
                throw err;
                return 0;
            } else {
                console.log("Aluno atualizado!");
                //callback();
                return 1;
            }
        });
        connection.on('error', function(err) {
            throw err;
            return 0;
        });
    });
};

module.exports = controladorAluno;