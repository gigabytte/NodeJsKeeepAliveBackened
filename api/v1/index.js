const express = require('express');
const router = express.Router();

const alive = require('./alive');
const capacity = require('./capacity');
const runtime = require('./runtime');

require('dotenv').config({ path: './.env.regex' })

//ROUTES//
// default welcome message when presented with simple GET
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NodeJsAlive Backend',
    running_version: 'v1.0'
  });
});

router.use('/alive', alive);
router.use('/capacity', capacity);
router.use('/runtime', runtime);

// export router
module.exports = router;