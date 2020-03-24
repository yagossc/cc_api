const { Pool, Client } = require('pg')

const express = require('express');
const app = express();
const port = 8080;

const routes = require('./api/routes');
routes.setup(app);

const swaggerapi = require('./swagger');
swaggerapi(app);

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eyemobile',
    password: 'postgres',
    port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})

app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});
