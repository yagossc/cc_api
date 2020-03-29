const { Pool } = require('pg');
const logger = require('../internal/logger').setup_logger();
const notfound = require('../internal/not_found');
const error_middleware = require('../app/errors');
const routes = require('./routes');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var server = {};

module.exports.setup = function(){
    server.app = app;
    server.db = new Pool({
        user:     process.env.DB_USER,
        host:     process.env.DB_HOST,
        databse:  process.env.DB,
        password: process.env.DB_PASS,
        port:     process.env.DB_PORT,
    });

    // Setup and use logger
    server.app.use(logger);

    // Setup routes
    routes.setup(server.app);

    // Better handle 404
    server.app.use(notfound.handler);

    // Setup error middleware
    server.app.use(error_middleware.handler);

    return server;
}

module.exports.start = function(s, port) {
    return s.app.listen(port, console.log("listening at "+ port));
}
