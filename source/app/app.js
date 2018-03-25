// Koa
const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
// PostgreSQL
const { Pool, Client } = require('pg');
const pool = new Pool();
const TABLE = 'tasks';

const app = new Koa();

app.use(serve('./public'));
app.use(bodyParser());

// API
const router = new Router({ prefix: '/api' });
router.get('/tasks', async (ctx, next) => {
    ctx.response.header['Content-Type'] = 'application/json';
    const res = await pool.query(`SELECT * FROM ${TABLE}`);
    ctx.body = JSON.stringify(res.rows);
    next();
});

router.post('/tasks', async (ctx, next) => {
    ctx.response.header['Content-Type'] = 'application/json';
    const res = await pool.query(`INSERT INTO ${TABLE} (name) VALUES ('${ctx.request.body.name}') RETURNING *`);
    ctx.body = JSON.stringify(res.rows[0]);
    next();
});


app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);

console.log('[Taskor] Server is listening port 3000');