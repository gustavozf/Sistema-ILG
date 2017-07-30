var pool = require('../functions/db');

function controladorIngresso() {

}

controladorIngresso.prototype.insereEndereco = function (ecpf, logradouro, numero, complemento, cep1) {
    var inic_query_end = "INSERT INTO ENDERECO VALUES (";

    var mid_query_end = ecpf + ',' + logradouro + ',' + numero + ',' + complemento + ',' + cep1 + ');';
    var final_query_ing = inic_query_end+mid_query_end;

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            //throw err;
        }
        console.log('entrou!');
        connection.query(final_query_ing, function(err, result){
            connection.release();
            if (err) {
                console.log('Endereço do Ingressante nao inserido!');
                throw err;
            } else {
                console.log('Endereço do Ingressante inserido!');
                //res.render('ingresso', {habilitado:1,inserido: 1, erro: 0});
            }
        });

        connection.on('error', function(err) {
            throw err;
        });


    });
};

module.exports = controladorIngresso;