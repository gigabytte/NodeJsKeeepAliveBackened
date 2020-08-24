var Client = require('ssh2').Client;
var path = require('path');
var fs = require('fs');


var generalSSHQuery = function(command, host, username, portNumber, privateKeyPath, callback){
  var conn = new Client();    

    conn.on('ready', function() {
   // console.log('Client :: ready');
      conn.exec(command, function(err, stream) {
        if (err) {
            callback(err);
            return;
        }
        stream.on('close', function(code, signal) {
         // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
          
        }).on('data', function(data) {
        //  console.log('STDOUT: ' + data)
          callback(null, data);
        }).stderr.on('data', function(data) {
         // console.log('STDLOG: ' + data);
        });
      });
    }).connect({
      host: host,
      port: portNumber,
      username: username,
      privateKey: fs.readFileSync(path.join(__dirname, privateKeyPath))
    });
    };

module.exports = generalSSHQuery;