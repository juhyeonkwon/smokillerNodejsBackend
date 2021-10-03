let express = require('express');
let router = express.Router();
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');

const dbconfig = require('../../dbconfig');


router.post('/', function(req, res, err) {
    console.log(req.body);


    let params = [
        req.body.name,
        req.body.id,
        req.body.password,
        parseInt(req.body.rank)
    ];

    let connection = mysql.createConnection(dbconfig)

    connection.execute('insert into smoke.user(name, id, password, access) values (?, ?, ?, ?)', params, function(err, result) {
        if(err) {
            res.send('0');
            
            connection.end();

            return ;
        } else {
            res.send('1');
            
            connection.end();

            return ;
        }
    });

    return ;


});


module.exports = router;
