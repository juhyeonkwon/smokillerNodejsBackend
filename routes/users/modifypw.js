let express = require('express');
let router = express.Router();
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');

const dbconfig = require('../../dbconfig');


router.post('/', function(req, res, err) {
    console.log(req.body);


    let params = [
        req.body.password,
        parseInt(req.body.idx)
    ];

    let connection = mysql.createConnection(dbconfig)

    connection.execute('UPDATE smoke.user set password=? where idx = ?', params, function(err, result) {
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
