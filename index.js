const express = require('express');
const app = express();

// Setup doc
const swaggerapi = require('./swagger');
swaggerapi(app);

// Load the environment config
const dotenv = require('dotenv');
dotenv.config()

const server = require('./api/server')

// Setup server and get a connection
const s = server.setup(app);
const connection = server.start(s, process.env.TAPI_PORT);

// Setup routes
const routes = require('./api/routes');
routes.setup(app);

// Lock graceful shutdown routine
const system = require('./internal/system');
system.graceful_shutdown(connection, s.db);
