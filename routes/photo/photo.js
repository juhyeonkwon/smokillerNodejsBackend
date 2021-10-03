const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');

const dbconfig = require('../../dbconfig');


router.post('/list', async function(req, res) {

    let connection = await mysqlPromise.createConnection(dbconfig);

    const [rows, field] = await connection.execute('SELECT * FROM smoke.photo order by idx desc');

    console.log(rows);

    res.send(rows);

    connection.end();

});


//완료여부에 따라 버그가 일어남
//완료 안한거는 user_id가 할당이 안되어있기 때문에 버그 일어남

router.post('/detail', async function(req, res) {
    console.log(req.body);
    console.log(req.body.process);


    let connection = await mysqlPromise.createConnection(dbconfig);


    if(req.body.process === "yet") {
        const [rows, field] = await connection.execute('SELECT p.idx, p.src, p.time, p.location, p.process, p.processed_time, p.smoking, p.comment, p.src FROM smoke.photo p where p.idx = ?', [parseInt(req.body.id)]);


        res.send(rows);
    
    
        connection.end();
    }
    else {
        const [rows, field] = await connection.execute('SELECT p.idx, p.src, p.time, p.location, p.process, p.processed_time, p.smoking, u.name, p.comment, p.src FROM smoke.photo p, smoke.user u where p.useridx = u.idx AND p.idx = ?', [parseInt(req.body.id)]);


        res.send(rows);
        console.log(rows);

    
        connection.end();
    } 

});


//update smoke.photo set `process` = 1, processed_time = NOW(), smoking = 1, useridx = 1, comment = "comment " where idx = 8
router.post('/proceed', async function(req, res) {

    console.log(req.body);

    let connection = mysql.createConnection(dbconfig);

    let params = [
        req.body.smoking,
        parseInt(req.body.user_id),
        req.body.comment,
        parseInt(req.body.photo_id)
    ]

    connection.query('update smoke.photo set process = 1, processed_time = NOW(), smoking = ?, useridx = ?, comment = ? where idx = ?', params, function(err, result) {
        if(err) {
            console.log(err)
            res.sendStatus('0')
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

router.post('modify', async function(req, res) {


});


module.exports = router;
