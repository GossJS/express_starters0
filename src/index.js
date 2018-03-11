const express = require('express');
const { get } = require('axios');

let items; // для последующего заполнения
const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();
app
  .get(/hello/, r => r.res.end('Hello world!'))
  .get('/login', r => r.res.render('login'))
  .get(/users/, async r => {
    r.res.render('list', { title: 'Список логинов', items });
  })
  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
  .set('view engine', 'pug')
  .listen(process.env.PORT || PORT, async () => {
    console.log(`Старт процесса: ${process.pid}`);
    // items = (await get(URL)).data.users;
    ({ data: { users: items } } = await get(URL)); // круглые скобки
  });
