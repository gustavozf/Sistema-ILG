var pool = require('../functions/db');
var pdf = require('pdfkit');
var fs = require('fs');
var controladorIngressante = require('./controladorIngressante');

function controladorFuncionario() {
}

controladorFuncionario.prototype.getLista = function () {
    var cont = 1;
    var status = ['Aprovado', 'Lista de Espera'];
    var id = '';
    var candidato = new controladorIngressante();
    var myDoc = new pdf;

    console.log('Criando arquivo...');
    myDoc.pipe(fs.createWriteStream('public/documents/AprovadosUNICO.pdf'));

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        //console.log('entrou!');
        connection.query('SELECT INOME, ISOBRENOME, DESCRICAO, MEDIA, NUM_INSCRICAO ' +
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

                    myDoc.font('Times-Roman')
                        .fontSize(14)
                        .text('Lista de aprovados do ILG UEM:\n', {align: 'center'});

                    var descricao = "";

                    for(i in result){
                        if (descricao != result[i].DESCRICAO){
                            descricao = result[i].DESCRICAO;
                            myDoc.font('Times-Roman')
                                .fontSize(12)
                                .text('\nCurso: '+result[i].DESCRICAO+'\n', {align: 'justify'});
                            cont = 1;
                        }
                        if (cont <= 13){
                            myDoc.font('Times-Roman')
                                .fontSize(12)
                                .text('#' + cont + ' Nome: '+result[i].INOME+" "
                                    +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + ' | Status: ' + status[0] + '\n', {align: 'justify'});
                            cont++;

                            id = result[i].NUM_INSCRICAO;
                            console.log("Chamando candidato de ID: " + id);
                            candidato.setIngressanteAprovado(id);
                        } else {
                            myDoc.font('Times-Roman')
                                .fontSize(12)
                                .text('#' + cont + ' Nome: '+result[i].INOME+" "
                                    +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + ' | Status: ' + status[1] + '\n', {align: 'justify'});
                            cont++;
                        }

                    }
                    //myDoc.end();
                    console.log('Doc end reached!');
                    //this.makeListaAptos(result);
                }
            });
        connection.on('error', function(err) {
            throw err;
        });
    });

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        //console.log('entrou!');
        connection.query('SELECT INOME, ISOBRENOME, DESCRICAO, NUM_INSCRICAO, MEDIA ' +
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

                    //var myDoc = new pdf;
                    //console.log(result);
                    console.log('Criando arquivo...');
                    //myDoc.pipe(fs.createWriteStream('AprovadosNaoUEM.pdf'));
                    myDoc.font('Times-Roman')
                        .fontSize(14)
                        .text('\n\nLista de aprovados do ILG UEM (Nao Vinculados a UEM):\n', {align: 'center'});

                    var descricao = "";

                    for(i in result){
                        if (descricao != result[i].DESCRICAO){
                            descricao = result[i].DESCRICAO;
                            myDoc.font('Times-Roman')
                                .fontSize(12)
                                .text('\nCurso: '+result[i].DESCRICAO+'\n', {align: 'justify'});
                            cont = 1;
                        }
                        if (cont <= 3){
                            myDoc.font('Times-Roman')
                                .fontSize(12)
                                .text('#' + cont + ' Nome: '+result[i].INOME+" "
                                    +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + ' | Status: ' + status[0] + '\n', {align: 'justify'});
                            cont++;

                            id = result[i].NUM_INSCRICAO;
                            console.log("Chamando candidato de ID: " + id);
                            candidato.setIngressanteAprovado(id);
                        } else {
                            myDoc.font('Times-Roman')
                                .fontSize(12)
                                .text('#' + cont + ' Nome: '+result[i].INOME+" "
                                    +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + ' | Status: ' + status[1] + '\n', {align: 'justify'});
                            cont++;
                        }

                    }
                    //
                    console.log('Doc end reached!');
                    myDoc.end();
                    //this.makeListaAptos(result);
                }
            });
        connection.on('error', function(err) {
            throw err;
        });
    });

};

controladorFuncionario.prototype.getListaIngressantes = function () {
    var cont = 1;
    var status = ['Aprovado', 'Lista de Espera'];
    var id = '';
    var candidato = new controladorIngressante();

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        //console.log('entrou!');
        connection.query('SELECT INOME, ISOBRENOME, DESCRICAO, MEDIA, NUM_INSCRICAO ' +
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

                console.log('Criando arquivo...');
                myDoc.pipe(fs.createWriteStream('public/documents/Aprovados.pdf'));
                myDoc.font('Times-Roman')
                    .fontSize(14)
                    .text('Lista de aprovados do ILG UEM:\n', {align: 'center'});

                var descricao = "";

                for(i in result){
                    if (descricao != result[i].DESCRICAO){
                        descricao = result[i].DESCRICAO;
                        myDoc.font('Times-Roman')
                            .fontSize(12)
                            .text('\nCurso: '+result[i].DESCRICAO+'\n', {align: 'justify'});
                        cont = 1;
                    }
                    if (cont <= 13){
                        myDoc.font('Times-Roman')
                            .fontSize(12)
                            .text('#' + cont + ' Nome: '+result[i].INOME+" "
                                +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + ' | Status: ' + status[0] + '\n', {align: 'justify'});
                        cont++;

                        id = result[i].NUM_INSCRICAO;
                        console.log("Chamando candidato de ID: " + id);
                        candidato.setIngressanteAprovado(id);
                    } else {
                        myDoc.font('Times-Roman')
                            .fontSize(12)
                            .text('#' + cont + ' Nome: '+result[i].INOME+" "
                                +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + ' | Status: ' + status[1] + '\n', {align: 'justify'});
                        cont++;
                    }

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

controladorFuncionario.prototype.getListaIngressantesFora = function () {
    var cont = 1;
    var status = ['Aprovado', 'Lista de Espera'];
    var id = '';
    var candidato = new controladorIngressante();

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        //console.log('entrou!');
        connection.query('SELECT INOME, ISOBRENOME, DESCRICAO, NUM_INSCRICAO, MEDIA ' +
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
                myDoc.pipe(fs.createWriteStream('public/documents/AprovadosNaoUEM.pdf'));
                myDoc.font('Times-Roman')
                    .fontSize(14)
                    .text('Lista de aprovados do ILG UEM (Nao Vinculados a UEM):\n', {align: 'center'});

                var descricao = "";

                for(i in result){
                    if (descricao != result[i].DESCRICAO){
                        descricao = result[i].DESCRICAO;
                        myDoc.font('Times-Roman')
                            .fontSize(12)
                            .text('\nCurso: '+result[i].DESCRICAO+'\n', {align: 'justify'});
                        cont = 1;
                    }
                    if (cont <= 3){
                        myDoc.font('Times-Roman')
                            .fontSize(12)
                            .text('#' + cont + ' Nome: '+result[i].INOME+" "
                                +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + ' | Status: ' + status[0] + '\n', {align: 'justify'});
                        cont++;

                        id = result[i].NUM_INSCRICAO;
                        console.log("Chamando candidato de ID: " + id);
                        candidato.setIngressanteAprovado(id);
                    } else {
                        myDoc.font('Times-Roman')
                            .fontSize(12)
                            .text('#' + cont + ' Nome: '+result[i].INOME+" "
                                +result[i].ISOBRENOME+ " | Media: "+result[i].MEDIA + ' | Status: ' + status[1] + '\n', {align: 'justify'});
                        cont++;
                    }

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

controladorFuncionario.prototype.makeListaAptosDuasListas = function () {
    this.getListaIngressantes();
    this.getListaIngressantesFora();
};

controladorFuncionario.prototype.makeListaAptosUmaLista = function () {
    this.getLista();
};

controladorFuncionario.prototype.segundaChamada= function(ID){
    var candidato = controladorIngressante();
    candidato.setIngressanteAprovado(ID);
};

module.exports = controladorFuncionario;