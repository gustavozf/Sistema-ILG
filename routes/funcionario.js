var express = require('express');
var router = express.Router();
var pool = require('../functions/db');
var controladorAluno = require('../classes/controladorAluno');
var controladorFuncionario = require('../classes/controladorFuncionario');

//Insere um novo aluno (casos a parte)
router.get('/', function(req, res, next) {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        console.log('entrou!');
        connection.query('SELECT * FROM HAB_INGR', function(err, result){
            connection.release();
            if (err) {
                throw err;
                console.log('Impossivel recuperar habilitação!');
            } else {
                console.log('Sucesso!');
                res.render('funcionario', {habilitado: result[0].HABILITADO,
                                        inserido: false,
                                        erro: false,
                                        gerado: false
                                        });
            }
        });
        connection.on('error', function(err) {
            throw err;
        });
    });
});

//Insere um ID, e a pessoa é chamada para se inscrever
router.get('/segChamada', function (req, res) {

});

//Gera os PDFs com os aceitos e imprime na tela
router.get('/realSelecao', function (req, res) {
    var funcionario = new controladorFuncionario();

    funcionario.makeListaAptosDuasListas();
    res.render('funcionario', {
                habilitado: true,
                inserido: false,
                erro: false,
                gerado: true
    });
});

/*router.get('/realSelecaoDuas', function (req, res) {
    var funcionario = new controladorFuncionario();

    funcionario.makeListaAptosDuasListas();
    window.open('/documents/Aprovados.pdf', '_blank');
    window.open('/documents/AprovadosNaoUem.pdf', '_blank');
});*/

//Move um aluno deu uma turma existente para outra
router.post('/moverAluno', function (req, res) {
    var aluno = new controladorAluno();
    var num_inscricao = req.body.num;
    var curso = req.body.curso;
    var turma = req.body.turma;
    var booleano = 1;
    console.log(num_inscricao + ' '+curso+' '+turma);

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        console.log('entrou!');
        connection.query('SELECT * FROM HAB_INGR', function(err, result){
            connection.release();
            if (err) {
                throw err;
                console.log('Impossivel recuperar habilitação!');
            } else {
                console.log('Sucesso!');
                booelano = aluno.mudarTurma(num_inscricao, curso, turma);
                console.log(booleano);
                if (!booelano){
                    res.render('funcionario', {habilitado: result[0].HABILITADO, inserido: true, erro: false, gerado: false});
                }else{
                    res.render('funcionario', {habilitado: result[0].HABILITADO, inserido: false, erro: true, gerado: false});
                }
            }
        });
        connection.on('error', function(err) {
            throw err;
        });
    });

});

module.exports = router;