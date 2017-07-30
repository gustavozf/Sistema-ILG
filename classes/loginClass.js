var pool = require('../functions/db');

function Login() {

}

Login.prototype.autenticaLogin(usuario) = function () {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        console.log('entrou!');
        connection.query("INSERT INTO ", function(err, result){
            connection.release();
            if (err) {
                throw err;
            } else {

            }
        });
        connection.on('error', function(err) {
            throw err;
        });
    });
};