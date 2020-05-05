// Native modules
const http   = require('http');
const assert = require('assert');

// Middlewares
const logger           = require('../internal/logger').setup();
const notfound         = require('../internal/notfound');
const errorMiddleware = require('../app/errors');

// API Routes
const routes = require('./routes');

// Express
const express = require('express');
const app     = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Swagger docs
const swaggerui  = require('swagger-ui-express');
const swaggerdoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'cc_api',
            version: '1.0.0',
            description: 'An example credit card transaction based API.',
        },
        basePath: '/',
    },
    apis: ['./api/routes.js']
}

const swaggerSpecs = swaggerdoc(swaggerOptions);

var server;

// init initializes a server with all its middlewares/routes
module.exports.init = function(){
    return new Promise((resolve, reject) => {

        if (server){
            console.warn("Trying to init server again.");
            reject('Server already initialized');
        }
        server = {};

        server.app = app;

        // Setup swagger documentation
        server.app.use('/api-docs', swaggerui.serve,
                       swaggerui.setup(swaggerSpecs));

        // Setup and use logger
        server.app.use(logger);

        // Setup routes
        routes.setup(server.app);

        // Better handle 404
        server.app.use(notfound.handler);

        // Setup error middleware
        server.app.use(errorMiddleware.handler);

        resolve();

    });
}

// get returns the active server instance
module.exports.get = function() {
    assert.ok(server, "Server not initialized, please call init().");
    return server;
}

// run creates the server connection listening
module.exports.run = function(port) {
    assert.ok(server, "Server not initialized, please call init().");
    server.conn = http.createServer(server.app);
    return new Promise((resolve, reject) => {
        server.conn.on('listening', () => {
            resolve();
        })
        server.conn.on('error', err => {
            reject(err);
        })
        server.conn.listen(port);
    })
}

// close performs the server shutdown
module.exports.close = function() {
    return new Promise(resolve => {
        assert.ok(server, "Server not initialized, please call init().");
        server.conn.on('close', () => {
            console.log("Server disconnected.");
            resolve();
        })
        server.conn.close();
    });
}
