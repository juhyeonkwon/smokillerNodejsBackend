let express = require('express');
let router = express.Router();
const fs = require('fs');
let Readable = require('stream').Readable


router.post('/', function(req, res, next) {
  console.log(req.headers);
  console.log(req.body);
  console.log(req.cookies);

  const imgBuffer = Buffer.from(req.body.image, 'base64')

  let s = new Readable()

  s.push(imgBuffer)   
  s.push(null) 

  let str = req.body.image.slice(1,20);

  //사진저장
  s.pipe(fs.createWriteStream(str));


  const params = [
    str,
    req.body.location,
    req.body.time
  ]

  connection.execute('insert into smoke.image(url, location, time) values (?, ?, ?)', params, function(err, result) {
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

  res.send(req.headers);

});

module.exports = router;