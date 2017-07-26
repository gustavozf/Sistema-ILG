var express = require('express');
var router = express.Router();
var pool = require('../functions/db');

router.get('/:tipo', function(req, res, next) {
  var tipo = req.params.tipo;
  var rota = '<form class="form-horizontal" action="/login/' +tipo + '/validacao" method="GET">';
  res.render('login', {errado: false, rota: rota});
});

router.get('/admin/validacao', function(req, res, next){
  if((req.body.usuario === 'admin') && (req.body.senha === 'adminilg')){
    res.redirect('/admin');
  } else {
    res.redirect('/login/admin');
  }
});

router.get('/aluno/validacao', function(req, res, next){
  var user = req.body.usuario;
  var pass = req.body.senha;

  console.log(user + " "+ pass);
  var final_query = "SELECT ACPF,ARG FROM ALUNO WHERE ACPF = '"+ user + "' AND ARG='" + pass + "';";
  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }
        console.log('entrou!');
        connection.query(final_query, function(err, result){
          connection.release();
          if (err) {
            //throw err;
            console.log('Falha!');
            res.render('curso',{inserido: false, erro: true});
          } else {
            if(result){
              redirect = "/aluno/" + user;
              res.redirect(redirect);
            } else {
              res.redirect('/login/aluno');
            }
          }
        });
        connection.on('error', function(err) {
              throw err;
        });
    });
    console.log('saiu!');
});

router.get('/admin/validacao', function(req, res, next){

  if((req.body.usuario=='admin')&&(req.body.senha=='adminilg')){
    res.redirect('/admin');
  } else {
    res.render('login', {errado: true});
  }
});

module.exports = router;
