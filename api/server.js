const http = require('http');
// Middlewares
const logger = require('../internal/logger').setup_logger();
const notfound = require('../internal/not_found');
const error_middleware = require('../app/errors');

// API Routes
const routes = require('./routes');

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Swagger docs
const swaggerui = require('swagger-ui-express');
const swaggerdoc = require('swagger-jsdoc');

const swagger_options = {
    swaggerDefinition: {
        info: {
            title: 'eye_api',
            version: '1.0.0',
            description: 'An example credit card transaction based API.',
        },
        basePath: '/',
    },
    apis: ['./api/routes.js']
}

const specs = swaggerdoc(swagger_options);

var server = {};

module.exports.init = function(){
    server.app = app;

    // Setup documentation
    server.app.use('/api-docs', swaggerui.serve, swaggerui.setup(specs));

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

module.exports.run = function(s, port) {
    server = http.createServer(app);
    return new Promise((resolve, reject) => {
        server.on('listening', () => {
            resolve();
        })
        server.on('error', err => {
            reject(err);
        })
        server.listen(port);
    })
}
