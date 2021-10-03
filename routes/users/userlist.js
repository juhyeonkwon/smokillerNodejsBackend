const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');

const dbconfig = require('../../dbconfig');



//SELECT idx, name, id, access FROM smoke.user;
router.post('/', async function(req, res) {
    
    const connection = await mysqlPromise.createConnection(dbconfig)

    const[rows, field] = await connection.execute('SELECT idx, name, id, access FROM smoke.user');


    res.send(rows);

    return ;
    


});

router.post('/modify', async function(req, res) {
    console.log(req.body.access);
    
    const connection = mysql.createConnection(dbconfig)

    connection.execute('UPDATE smoke.user set access = ? where idx = ?', [parseInt(req.body.access),parseInt(req.body.idx)], function(err, result) {
        if(err) {
            res.send('0');
        } else {
            res.send('1')
        }

        connection.end();
        return ;
    })

    return ;

});

router.post('/delete', async function(req, res) {
    
    const connection = mysql.createConnection(dbconfig)

    console.log(req.body.idx)

    connection.execute('delete from smoke.user where idx = ?', [parseInt(req.body.idx)], function(err, result) {
        if(err) {
            res.send('0');
        } else {
            res.send('1')
        }

        connection.end();
        return ;
    })

    return ;
    


});


module.exports = router;
