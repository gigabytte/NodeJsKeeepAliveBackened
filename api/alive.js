const express = require('express');
const router = express.Router();

var Client = require('ssh2').Client;

var path = require('path');
var fs = require('fs');

const upsStatusComm = 'sudo pwrstat -status | grep State';
const upsStatusRegex = /\b(Normal|Battery Power)\b/;

//ROUTES//
// default welcome message when presented with simple GET
router.get('/', (req, res) => {
  var conn = new Client();

  conn.on('ready', function(error) {
    conn.exec(upsStatusComm, function(err, stream) {

      if (err) throw err;

      stream.on('close', function(code, signal) {
        conn.end();
      }).on('data', function(data) {

        var match = `${data}`.match(upsStatusRegex);
        // if no metach send status code 500 server error
        if (!match){
          res.statusCode = 500;
          res.json({
            message: 'Unable to parse output, raw output: ' + `${data}`,
            running_version: 'v1.0'
          });
        }
        // return okay return output
        res.statusCode = 200;
        res.json({
          message: match[0],
          running_version: 'v1.0'
        });


      }).stderr.on('data', function(data) {
        // STDERR response with internal server error
        res.statusCode = 500;
        res.json({
          message: 'STDERR, admin will be notified, raw output: ' + `${data}`,
          running_version: 'v1.0'
        });
      });
    });
  }).connect({
    host: `${process.env.HOST}`,
    port: 22,
    username: `${process.env.USERNAME}`,
    privateKey: fs.readFileSync(path.join(__dirname,`${process.env.PRIV_KEY_PATH}`))
  });


});

// export router
module.exports = router;