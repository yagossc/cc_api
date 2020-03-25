const { Pool } = require('pg')

var server = {};

module.exports.setup = function(app){
    server.app = app;
    server.db = new Pool({
        user:     process.env.DB_USER,
        host:     process.env.DB_HOST,
        databse:  process.env.DB,
        password: process.env.DB_PASS,
        port:     process.env.DB_PORT,
    });

    // Setup and use logger
    logger = require('../internal/logger').setup_logger()
    server.app.use(logger);

    return server;
}

module.exports.start = function(s, port) {
    return s.app.listen(port, console.log("listening at "+ port));
}
