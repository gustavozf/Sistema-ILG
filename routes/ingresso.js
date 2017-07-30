var express = require('express');
var router = express.Router();
var pool = require('../functions/db');
var BoletoIngressante = require('../classes/BoletoIngressante');
var controladorIngresso = require('../classes/controladorIngresso');

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
            res.render('ingresso', { habilitado: result[0].HABILITADO, inserido: 0, erro: 0});
          }
        });
        connection.on('error', function(err) {
              throw err;
        });
    });

});

router.post('/inserirIngres', function(req, res, next) {
    var bolet = new BoletoIngressante();
    var ingressControl = new controladorIngresso();

  var inic_query_ing = "INSERT INTO INGRESSANTE (ICPF, IRG, INOME, ISOBRENOME, ISEXO, ITELEFONE, IDATA_NASC, POS_UEM) VALUES (";
  var cpf = "'" + req.body.cpf+ "'";
  var rg = "'" + req.body.rg+ "'";
  var nome = "'" + req.body.name+ "'";
  var sobrenome= "'" + req.body.sobrenome+ "'";
  var sexo= "'"+req.body.sexo+ "'";
  var telefone= "'" + req.body.telefone+ "'";
  var data_nasc= "'" + req.body.data_nasc+ "'";
  var pos_uem= req.body.pos_uem;

  var logradouro = "'" + req.body.logradouro + "'";
  var numero = req.body.num;
  var complemento = "'" + req.body.complemento + "'";
  var cep = req.body.cep;

  var mid_query_ing = cpf+',' + rg +','+nome+','+sobrenome+','+sexo+','+telefone+','+data_nasc+','+pos_uem +');';
  var final_query_ing = inic_query_ing + mid_query_ing;

  //var final_query_end = inic_query_end + mid_query_end;

  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          //throw err;
        }
        console.log('entrou!');
      connection.query(final_query_ing, function(err, result){
          connection.release();
          if (err) {
              console.log('Ingressante nao inserido!');
              res.render('ingresso', {habilitado:1,inserido: 0, erro: 1});
            //throw err;
          } else {
               console.log('Ingressante inserido!');
               ingressControl.insereEndereco(cpf,logradouro, numero, complemento,cep);
               //inserir na tabela ingresso
               //inserir na tabela de login
               bolet.gerarBoleto(req.body.cpf, req.body.name+' '+req.body.sobrenome, req.body.rg, req.body.logradouro, req.body.cep);
               res.render('ingresso', {habilitado:1,inserido: 1, erro: 0});
          }
      });

        connection.on('error', function(err) {
              throw err;
        });


  });
    console.log('saiu!');

});

module.exports = router;
