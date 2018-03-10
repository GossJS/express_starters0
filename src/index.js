const express = require('express');

const PORT = 4321;
const app = express();
app
  .get(/hello/, r => r.res.end('Hello world!'))

  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
  .set('view engine', 'pug')
  .listen(process.env.PORT || PORT, () => console.log(process.pid));
