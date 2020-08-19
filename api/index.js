const express = require('express');
const router = express.Router();

const alive = require('./alive');

//ROUTES//
// default welcome message when presented with simple GET
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NodeJsAlive Backend',
    running_version: 'v1.0'
  });
});

router.use('/alive', alive);

// export router
module.exports = router;