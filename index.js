const app = require('./app');

// start sever on localhost 5000 if not specified in .env.* file
const port = process.env.PORT || 5000;
const domain = process.env.DOMAIN || '127.0.0.1';

app.listen(port, domain, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://${domain}:${port}`);
  /* eslint-enable no-console */
});