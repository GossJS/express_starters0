const express = require('express');
const { get } = require('axios');
const bodyParser = require('body-parser');

let items;
const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .get(/hello/, r => r.res.end('Hello world!'))
  .get('/login', r => r.res.render('login'))
  .post('/login/check/', r => {
    const { body: { login: l } } = r;
    const user = items.find(({ login }) => login === l);
    if (user) {
      if (user.password === r.body.pass) {
        r.res.send('Good!');
      } else {
        r.res.send('Wrong pass!');
      }
    } else {
      r.res.send('No such user!');
    }
  })
  .get(/users/, async r => {
    r.res.render('list', { title: 'Список логинов', items });
  })
  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
  .set('view engine', 'pug')
  .listen(process.env.PORT || PORT, async () => {
    console.log(`Старт процесса: ${process.pid}`);
    ({ data: { users: items } } = await get(URL)); // круглые скобки
  });
