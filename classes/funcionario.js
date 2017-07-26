var pool = require('../functions/db');
var pdf = require('pdfkit');
var fs = require('fs');

function Funcionario() {
}

Funcionario.prototype.getListaIngressantes = function () {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        console.log('entrou!');
        connection.query('SELECT INOME, ISOBRENOME, DESCRICAO, MEDIA ' +
                            'FROM INGRESSANTE, TURMA, INGRESSO ' +
                            'WHERE MEDIA>=7.0 AND SIT_ENTREGA = 1 AND POS_UEM <> 0 ' +
                            'AND ICPF = INCPF AND SIT_PAGAMENTO = 1 AND COD_TURMA = INCOD_TURMA ' +
                            'ORDER BY INCOD_TURMA, MEDIA DESC;'
                        , function(err, result){
            connection.release();
            if (err) {
                throw err;
            } else {
                var i;
                var myDoc = new pdf;

                //console.log(result);
                console.log('Criando arquivo...');
                myDoc.pipe(fs.createWriteStream('Aprovados.pdf'));
                myDoc.font('Times-Roman')
                    .fontSize(14)
                    .text('Lista de aprovados do ILG UEM:\n\n', 100, 100);

                for(i in result){
                    myDoc.font('Times-Roman')
                        .fontSize(12)
                        .text('Curso: '+result[i].DESCRICAO+' | Nome: '+result[i].INOME+" "
                            +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + '\n');
                }
                myDoc.end();
                console.log('Doc end reached!');
                //this.makeListaAptos(result);
            }
        });
        connection.on('error', function(err) {
            throw err;
        });
    });
};

Funcionario.prototype.getListaIngressantesFora = function () {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        console.log('entrou!');
        connection.query('SELECT INOME, ISOBRENOME, DESCRICAO, MEDIA ' +
            'FROM INGRESSANTE, TURMA, INGRESSO ' +
            'WHERE MEDIA>=7.0 AND SIT_ENTREGA = 1 AND POS_UEM = 0 ' +
            'AND ICPF = INCPF AND SIT_PAGAMENTO = 1 AND COD_TURMA = INCOD_TURMA ' +
            'ORDER BY INCOD_TURMA, MEDIA DESC;'
            , function(err, result){
            connection.release();
            if (err) {
                throw err;
            } else {
                var i;
                var myDoc = new pdf;

                //console.log(result);
                console.log('Criando arquivo...');
                myDoc.pipe(fs.createWriteStream('AprovadosForaUEM.pdf'));
                myDoc.font('Times-Roman')
                    .fontSize(14)
                    .text('Lista de aprovados do ILG UEM (Nao Vinculados a UEM):\n\n', 100, 100);

                for(i in result){
                    myDoc.font('Times-Roman')
                        .fontSize(12)
                        .text('Curso: '+result[i].DESCRICAO+' | Nome: '+result[i].INOME+" "
                            +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + '\n');
                }
                myDoc.end();
                console.log('Doc end reached!');
                //this.makeListaAptos(result);
            }
        });
        connection.on('error', function(err) {
            throw err;
        });
    });
};

Funcionario.prototype.makeListaAptos = function () {

    this.getListaIngressantes();
    this.getListaIngressantesFora();
};

module.exports = Funcionario;