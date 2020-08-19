/* Author: Greg Brooks
See README.md for more info
*/

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const api = require('./api');
const app = express();

//middleware
app.use(cors());
app.set('trust proxy', 1);
app.use(express.json());
app.use(morgan('dev'));

// default welcome message when presented with simple GET from end point /api/v1/logger
app.get('/', (req, res) => {

  res.json({
    message: 'Welcome to NodeJsAlive Backend',
    lastest_version: 'v1.0'
  });
});

app.use('/api/v1', api);

// ERROR 404 response if route not found
app.use((req, res, next) => {
  const error = new Error('Route Not Found');
  error.status = 404;
  next(error);
});

// Send response to client with default server fault error of 500 if unknown
app.use((error, req, res, next) => {
  res.status(error.status || 5000);
  res.json({
    error:{
      message: error.message
    }
  });
});

module.exports = app;