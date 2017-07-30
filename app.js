var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var index = require('./routes/index');
var users = require('./routes/users');
var ingresso = require('./routes/ingresso');
var estrutura = require('./routes/estrutura');
var login = require('./routes/login');
var contato = require('./routes/contato');
var admin = require('./routes/admin');
var sobre = require('./routes/sobre');
var aluno = require('./routes/aluno');
var ingressante = require('./routes/ingressante');
var funcionario = require('./routes/funcionario');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/ingresso', ingresso);
app.use('/login', login);
app.use('/estrutura', estrutura);
app.use('/contato', contato);
app.use('/admin', admin);
app.use('/sobre', sobre);
app.use('/aluno', aluno);
app.use('/ingressante', ingressante);
app.use('/funcionario', funcionario);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
