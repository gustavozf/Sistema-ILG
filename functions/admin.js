var method = Admin.prototype;

function Admin(pool){
  this.pool = pool;
}

method.habilitaIngresso = function(){
  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
          return null;
        }
        console.log('entrou!');
        connection.query('SELECT * FROM HAB_INGR', function(err, result){
          connection.release();
          if (err) {
            throw err;
            //console.log('Impossivel recuperar habilitação!');
            return null;
          } else {
            //console.log('Sucesso!');
              return result[0].HABILITADO;
          }
        });
        connection.on('error', function(err) {
              throw err;
              return null;
        });
    });
};

module.exports = Admin;
