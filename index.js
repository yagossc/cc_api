// Load the environment config
const dotenv = require('dotenv');
config = dotenv.config();
if (config.error) process.exit(1);

// Initialize database;
const db = require('./store/db');
db.init(function(err){
    console.error(err);
    process.exit(1);
});

// Execute migrations
const migrations = require('./internal/migrations');
err = migrations.exec_migrations();
if (err != null) process.exit(1);

// Server module
const server = require('./api/server');

// Setup server
const s = server.setup();

// Start listening
const connection = server.start(s, process.env.TAPI_PORT);

// Lock graceful shutdown routine
const system = require('./internal/system');
system.graceful_shutdown(connection, db);

// Setup doc
const swaggerapi = require('./swagger');
swaggerapi(s.app);
