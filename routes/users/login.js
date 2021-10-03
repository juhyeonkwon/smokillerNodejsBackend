let express = require('express');
let router = express.Router();


router.post('/', function(req, res, err) {


    console.log(req.body);

    const params = [
        req.body.id,
        req.body.pw,
    ]

    const [rows, field] = await connection('SELET * FROM users WHERE id = ?, password = ?', params);

    if(rows.length < 0) {
        res.send('0')
    } else {
        res.send({
            id : rows[0].id,
            name : rows[0].name,
        });
    }

    

});


module.exports = router;
