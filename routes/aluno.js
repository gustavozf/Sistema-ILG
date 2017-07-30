var express = require('express');
var router = express.Router();
var pool = require('../functions/db');

/* GET home page. */
router.get('/:cpf', function(req, res, next) {
  var cpf = req.params.cpf;
  var inic_query = "SELECT ANOME, ASOBRENOME, ACPF, ARG, ATELEFONE, ADATA_NASC FROM ALUNO WHERE ACPF = '" + cpf +"';";
  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }
        connection.query(inic_query, function(err, results){

          if (err) {
            throw err;
            console.log('aluno nao lido!');
          } else {
              console.log('aluno lido!');
              var alun = '<li><a href="/aluno/'+ cpf + '">Info</a></li>';
              var visuaNot = '<li><a href="/aluno/visuaNotas/'+ cpf + '">Notas</a></li>';
              var visuaAp = '<li><a href="/aluno/visuaApro/'+ cpf + '">Aprovação</a></li>';
              res.render('aluno', {aluno: results[0], visuaApro: visuaAp, visuaNotas: visuaNot, aluno1: alun});
          }

        });

        connection.on('error', function(err) {
              throw err;
              return;
        });
  });
});

router.get('/visuaNotas/:cpf', function(req, res, next) {
  var cpf = req.params.cpf;
  var inic_query2 = "SELECT * FROM SALAS, CURSO WHERE SCOD_CURSO = COD_CURSO AND SCPF = '" + cpf +"';";

  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }
        connection.query(inic_query2, function(err, result){

          if (err) {
            throw err;
            console.log('sala nao lida!');
          } else {
              console.log('sala lida!');
              var alun = '<li><a href="/aluno/'+ cpf + '">Info</a></li>';
              var visuaNot = '<li><a href="/aluno/visuaNotas/'+ cpf + '">Notas</a></li>';
              var visuaAp = '<li><a href="/aluno/visuaApro/'+ cpf + '">Aprovação</a></li>';
              res.render('visuaNotas', {sala : result, visuaApro: visuaAp, visuaNotas: visuaNot, aluno1: alun});
          }

        });

        connection.on('error', function(err) {
              throw err;
              return;
        });
  });
});

router.get('/visuaApro/:cpf', function(req, res, next) {
  var cpf = req.params.cpf;
  var inic_query = "SELECT MEDIA, FALTAS, APROVADO, NOME_CURSO FROM SALAS, CURSO WHERE SCOD_CURSO = COD_CURSO AND SCPF = '" + cpf +"';";
  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }
        connection.query(inic_query, function(err, results){

          if (err) {
            throw err;
            console.log('notas nao lidas!');
          } else {
              console.log('notas lidas!');
              var alun = '<li><a href="/aluno/'+ cpf + '">Info</a></li>';
              var visuaNot = '<li><a href="/aluno/visuaNotas/'+ cpf + '">Notas</a></li>';
              var visuaAp = '<li><a href="/aluno/visuaApro/'+ cpf + '">Aprovação</a></li>';

              res.render('visuaApro', {aluno: results, visuaApro: visuaAp, visuaNotas: visuaNot, aluno1: alun });
          }

        });

        connection.on('error', function(err) {
              throw err;
              return;
        });
  });
});
module.exports = router;
