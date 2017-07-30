var express = require('express');
var router = express.Router();
var pool = require('../functions/db');
var BoletoIngressante = require('../classes/BoletoIngressante');

router.get('/:cpf', function(req, res, next) {
    var final_query_ing = "SELECT * FROM INGRESSANTE, ENDERECO WHERE ICPF = '" + req.params.cpf + "' AND ECPF = ICPF";

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            //throw err;
        }
        console.log('entrou!');
        //console.log(req.params.cpf);
        connection.query(final_query_ing, function(err, result){
            connection.release();
            if (err) {
                //throw err;
                console.log('Não foi ing.');
            } else {
                console.log('Foi ing.');
                var boleto = '<li><a href="/documents/'+ req.params.cpf + '.pdf" target="_blank">Visualizar Boleto</a></li>';
                var dados = '<li><a href="/ingressante/'+ req.params.cpf +'">Dados</a></li>'
                res.render('ingressante', {items: result[0], Boleto: boleto, Dados:dados});
            }
        });
    });
    console.log('saiu!');

});

module.exports = router;
