const express = require('express');
const { get } = require('axios');
const User = require('./bd');

const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();
app
  .get(/hello/, r => r.res.end('Hello world!'))
  .get(/aprilusers/, async r => {
    const items = await User.find();
    r.res.render('list', { title: 'Список монгологинов', items });
  })
  .get(/users/, async r => {
    const { data: { users: items } } = await get(URL);
    r.res.render('list', { title: 'Список логинов', items });
  })
  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
  .set('view engine', 'pug')
  .listen(process.env.PORT || PORT, () => console.log(process.pid));
