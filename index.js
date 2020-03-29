const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Setup doc
const swaggerapi = require('./swagger');
swaggerapi(app);

// Load the environment config
const dotenv = require('dotenv');
dotenv.config();

// Execute migrations
const migrations = require('./internal/migrations');
err = migrations.exec_migrations();
if (err != null) os.exit(1);

// Server module
const server = require('./api/server')

// Setup server
const s = server.setup(app);

// Start listening
const connection = server.start(s, process.env.TAPI_PORT);

// Lock graceful shutdown routine
const system = require('./internal/system');
system.graceful_shutdown(connection, s.db);
