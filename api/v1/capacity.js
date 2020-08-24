const express = require('express');
const router = express.Router();
const regexJson = require('./regex.json');
var ssh = require('./ssh');

var path = require('path');
var fs = require('fs');

const upsStatusComm = 'sudo pwrstat -status';
const upsStateRegex = regexJson.UPS_BATTERY_CAP;
//ROUTES//
// default welcome message when presented with simple GET
router.get('/', (req, res) => {

ssh(upsStatusComm, process.env.HOST, process.env.USERNAME, 22, process.env.PRIV_KEY_PATH, function(err, data){

  if (!err){
    var match = `${data}`.match(new RegExp(upsStateRegex));
    // if no metach send status code 500 server error
    if (!match){
      res.statusCode = 500;
      res.json({
        message: 'Unable to parse output',
        errMsg: 'Raw output: ' + `${data}`,
        date: Date.now(),
        running_version: 'v1.0'
      });
    }
    // return okay return output
    res.statusCode = 200;
    res.json({
      message: 'UPS battery is at ' + match[2] + '% capacity',
      date: Date.now(),
      running_version: 'v1.0'
    });
  }else{
    res.statusCode = 500;
    res.json({
      message: 'Remote server error related to SSH',
      errMsg: err,
      date: Date.now(),
      running_version: 'v1.0'
    });
  }


});


});

// export router
module.exports = router;