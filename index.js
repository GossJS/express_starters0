const express = require('express');
const PORT = 4321;
const app = express();
app
  .set('port', process.env.PORT || PORT)
  .get(/stop/, r => r.res.end('Bye!') && process.exit(0))
  .get('/*', r => r.res.send(`Working: ${process.pid}!`))
  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
  .set('view engine', 'pug')
  .listen(app.get('port'), () => {
        console.log(process.pid);
        console.log(app.get('port')); // will be like 8080 on c9
        console.log(app.get('env')); // development  is default
  });
