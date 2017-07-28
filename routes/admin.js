var express = require('express');
var router = express.Router();
var pool = require('../functions/db');


router.get('/', function(req, res, next) {
	res.render('admin', {inserido: false, erro: false});

});


//redireciona
router.get('/update', function(req, res, next){
	res.render('updateFunc', {inserido: false, erro: false});
});

router.get('/habilita', function(req, res, next){
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
				    res.render('habilita', {habilitado: result[0].HABILITADO});
          }
        });
        connection.on('error', function(err) {
              throw err;
        });
    });

});

router.get('/delete', function(req, res, next){
	res.render('deleteFunc', {inserido: false, erro: false});
});

router.get('/turma', function(req, res, next){
	res.render('turma', {inserido: false, erro: false});
});

router.get('/turma/update', function(req, res, next){
	res.render('updateTurma', {inserido: false, erro: false});
});

router.get('/turma/delete', function(req, res, next){
	res.render('deleteTurma', {inserido: false, erro: false});
});

router.get('/cursos', function(req, res, next){
	res.render('curso', {inserido: false, erro: false});
});

router.get('/cursos/update', function(req, res, next){
	res.render('updateCurso', {inserido: false, erro: false});
});

router.get('/cursos/delete', function(req, res, next){
	res.render('deleteCurso', {inserido: false, erro: false});
});

//Habilitar
router.post('/habilita/habilitar', function(req, res, next){
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }
        console.log('entrou!');
        connection.query('UPDATE HAB_INGR SET HABILITADO = 1 WHERE ANO = 2017', function(err, result){
          connection.release();
          if (err) {
            throw err;
            console.log('Impossivel habilitar!');
          } else {
            console.log('Habilitado!');
						res.render('habilita', {habilitado: 1});
          }
        });
        connection.on('error', function(err) {
              throw err;
        });
    });
});

router.post('/habilita/desabilitar', function(req, res, next){
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }
        console.log('entrou!');
        connection.query('UPDATE HAB_INGR SET HABILITADO = 0 WHERE ANO = 2017', function(err, result){
          connection.release();
          if (err) {
            throw err;
            console.log('Impossivel desabilitar!');
          } else {
            console.log('Desabilitado!');
						res.render('habilita', {habilitado: 0});
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
});

//Metodos de Inserir
router.post('/cursos/inserirCur', function(req, res, next) {
	var inic_query = 'INSERT INTO CURSO VALUES (';
	var nome = "'" + req.body.nome + "'";
	var preco = req.body.preco + '.0';
	var carga = req.body.carga + '.0';
	var cod_cur = req.body.cod_cur;

	var mid_query = nome + ',' + preco + ',' +  carga + ',' + cod_cur +');';
	var final_query = inic_query + mid_query;

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
            console.log('curso nao inserida!');
						res.render('curso',{inserido: false, erro: true});
          } else {
            console.log('curso inserida!');
				    res.render('curso',{inserido: true, erro: false});
          }
        });
        connection.on('error', function(err) {
              throw err;
        });
    });
    console.log('saiu!');
});

router.post('/turma/insereTur', function(req, res, next) {
	var inic_query = 'INSERT INTO TURMA VALUES (';
	var cod_turma = req.body.cod_turma;
	var horario = "'" + req.body.horario + "'";
	var prof = "'" + req.body.prof + "'";
	var cod_curso = req.body.cod_cur;
	var num = req.body.num;
    var cpf_prof = "'" + req.body.cpf_prof + "'";
    var descricao = "'" + req.body.descricao+ "'";
    var disp = req.body.disp ;

	var mid_query = cod_turma + ',' + horario + ',' + prof + ','+ cpf_prof +
                ','+cod_curso + ',' + num + ','+descricao+','+disp+');';
	var final_query = inic_query + mid_query;

    //console.log(final_query);
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
            console.log('turma nao inserida!');
						res.render('turma',{inserido: false, erro: true});
          } else {
            console.log('turma inserida!');
				    res.render('turma',{inserido: true, erro: false} );
          }
        });
        connection.on('error', function(err) {
              throw err;
        });
    });
    console.log('saiu!');
});

router.post('/inserirFunc', function(req, res, next) {
	var inic_query = 'INSERT INTO FUNCIONARIO VALUES (';
  var cpf = "'" + req.body.cpf+ "'";
  var rg = "'" + req.body.rg+ "'";
  var nome = "'" + req.body.nome + "'";
  var sobrenome= "'" + req.body.sobrenome+ "'";
  var sexo= "'"+req.body.sexo+ "'";
	var id= "'"+req.body.cpf +"'";
	var pass= "'"+ req.body.nome+req.body.rg +"'";
  var telefone= "'" + req.body.telefone+ "'";
  var data_nasc= "'" + req.body.data_nasc+ "'";
  var tipo = req.body.tipo_func;

  var mid_query = cpf+',' + rg +','+nome+','+sobrenome+','+sexo+','
                +id+','+pass+','+telefone+','+data_nasc+','+ tipo + ');';
  var final_query = inic_query + mid_query;

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
            console.log('funcionario nao inserido!');
						res.render('admin', {inserido: false, erro: true} );
          } else {
            console.log('funcionario inserido!');
				    res.render('admin', {inserido: true, erro: false, user: id, senha: pass} );
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
    console.log('saiu!');
});

//Metodos de Visualizar
router.get('/visua', function(req, res, next) {
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }
        console.log('entrou visuaFunc!');
        connection.query('SELECT * FROM FUNCIONARIO', function(err, result){
          connection.release();
          if (err) {
            throw err;
            console.log('Impossivel recuperar funcionarios!');
          } else {
            console.log('Funcionarios Retirados');
				    res.render('visuaFunc', {items: result});
          }
        });
        connection.on('error', function(err) {
              throw err;
        });
    });
    console.log('saiu!');
});

router.get('/cursos/visua', function(req, res, next) {
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }
        console.log('entrou!');
        connection.query('SELECT * FROM CURSO', function(err, result){
          connection.release();
          if (err) {
            throw err;
            console.log('Impossivel recuperar curso!');
          } else {
            //console.log(result);
				    res.render('visuaCurso', {items: result});
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
    console.log('saiu!');
});

router.get('/turma/visua', function(req, res, next) {
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }
        console.log('entrou!');
        connection.query('SELECT * FROM TURMA', function(err, result){
          connection.release();
          if (err) {
            throw err;
            console.log('Impossivel recuperar turma!');
          } else {
            //console.log(result);
				    res.render('visuaTur', {items: result});
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
    console.log('saiu!');
});

//Metodos de update
router.post('/updateFunc', function(req, res, next) {
	var inic_query = 'UPDATE FUNCIONARIO SET ';
  var cpf = "'" + req.body.cpf+ "'";
  var rg = "FRG = '" + req.body.rg+ "'";
  var nome = "FNOME = '" + req.body.nome + "'";
  var sobrenome= "FSOBRENOME = '" + req.body.sobrenome+ "'";
  var sexo= "FSEXO= '"+req.body.sexo+ "'";
  var telefone= "FTELEFONE = '" + req.body.telefone+ "'";
  var data_nasc= "FDATA_NASC= '" + req.body.data_nasc+ "'";
  var tipo ="TIPO_ACESSO= "+ req.body.tipo_func;

  var mid_query = rg +','+nome+','+sobrenome+','+sexo+','+telefone+','+data_nasc+
                                        ','+tipo+' WHERE FCPF =' + cpf +';';
  var final_query = inic_query + mid_query;

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
            console.log('funcionario nao atualizado!');
						res.render('updateFunc', {inserido: false, erro: true} );
          } else {
            console.log('funcionario atualizado!');
				    res.render('updateFunc', {inserido: true, erro: false} );
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
    console.log('saiu!');

});

router.post('/turma/updateTur', function(req, res, next) {
	var inic_query = 'UPDATE TURMA SET ';
	var cod_turma = req.body.cod_turma;
	var horario = "HORARIO= '" + req.body.horario + "'";
	var prof = "PROFESSOR= '" + req.body.prof + "'";
	var num = 'NUM_VAGAS= '+ req.body.num;
	var cpf_prof = "CPF_PROFESSOR='" + req.body.cpf_prof + "'";
	var descricao = "DESCRICAO='" + req.body.descricao+ "'";
	var disp = "DISPONIBILDIADE='"+ req.body.disp+ "'";


	var mid_query = horario + ',' + prof + ',' +cpf_prof +
                ',' +num +','+descricao+','+disp+' WHERE COD_TURMA= ' + cod_turma+';';
	var final_query = inic_query + mid_query;

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
            console.log('turma nao atualizada!');
						res.render('updateTurma',{inserido: false, erro: true});
          } else {
            console.log('turma atualizada!');
				    res.render('updateTurma',{inserido: true, erro: false} );
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
    console.log('saiu!');
});

router.post('/cursos/updateCur', function(req, res, next) {
	var inic_query = 'UPDATE CURSO SET ';
	var nome = "NOME_CURSO= '" + req.body.nome + "'";
	var preco ="PRECO= "+ req.body.preco + '.0';
	var carga = "CARGA_HORARIO= " + req.body.carga + '.0';
	var cod_cur = req.body.cod_cur;

	var mid_query = nome + ',' + preco + ',' +  carga + ' WHERE COD_CURSO= '+ cod_cur +';';
	var final_query = inic_query + mid_query;

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
            console.log('curso nao atualizado!');
						res.render('updateCurso',{inserido: false, erro: true});
          } else {
            console.log('curso atualizado!');
				    res.render('updateCurso',{inserido: true, erro: false});
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
    console.log('saiu!');
});

//metodos delete
router.post('/deleteFunc', function(req, res, next) {
	var inic_query = 'DELETE FROM FUNCIONARIO WHERE FCPF = ';
  var cpf = "'" + req.body.cpf+ "'";
  var final_query = inic_query + cpf +';';

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
            console.log('funcionario nao excluido!');
						res.render('deleteFunc', {inserido: false, erro: true} );
          } else {
            console.log('funcionario excluido!');
				    res.render('deleteFunc', {inserido: true, erro: false} );
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
    console.log('saiu!');

});

router.post('/cursos/deleteCur', function(req, res, next) {
	var inic_query = 'DELETE FROM CURSO WHERE COD_CURSO = ';
	var cod_cur = req.body.cod_cur;

	var final_query = inic_query + cod_cur +';';

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
            console.log('curso nao excluido!');
						res.render('deleteCurso',{inserido: false, erro: true});
          } else {
            console.log('curso excluido!');
				    res.render('deleteCurso',{inserido: true, erro: false});
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
    console.log('saiu!');
});

router.post('/turma/deleteTur', function(req, res, next) {
	var inic_query = 'DELETE FROM TURMA WHERE COD_TURMA = ';
	var cod_tur = req.body.cod_turma;

	var final_query = inic_query + cod_tur +';';

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
            console.log('turma nao excluida!');
						res.render('deleteTurma',{inserido: false, erro: true});
          } else {
            console.log('turma excluida!');
				    res.render('deleteTurma',{inserido: true, erro: false});
          }
        });
        connection.on('error', function(err) {
              throw err;
              return;
        });
    });
    console.log('saiu!');
});

module.exports = router;
