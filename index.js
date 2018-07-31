const cluster = require('cluster');
const moment = require('moment');
let i = 0;
const PORT = 4321;
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker ${worker.process.pid} died.' );
  });
} else {
    const app = require('express')();
	app
	  .use((r, res, next) => console.log(`--${++i}-- ${process.pid} --`) || next())
	  .set('port', process.env.PORT || PORT)
	  .get(/stop/, r => r.res.end('Bye!') && process.exit(0))
	  .get('/sleep', r => {
	      const t = r.query.n || 1;
	      const m1 = moment().format('HH:mm:ss');
	      setTimeout(() => {
	        r.res.send(m1 + ' ' + moment().format('HH:mm:ss') + ' made by: ' + process.pid);
	      }, t*1000);
	  })
	  .get('/*', r => r.res.send(`Working: ${process.pid}!`))
	  .use(r => r.res.status(404).end('Still not here, sorry!'))
	  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
	  .set('view engine', 'pug')
	  .listen(app.get('port'), () => {
	        console.log(process.pid);
	        console.log(app.get('port')); // will be like 8080 on c9
	        console.log(app.get('env')); // development  is default
	  });
}
