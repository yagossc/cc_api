// Load the environment config
const dotenv = require('dotenv');
config = dotenv.config();
if (config.error) {
    console.error(config.error);
    process.exit(1);
}

// Lock graceful shutdown routine
const system = require('./internal/system');
system.graceful_shutdown();

// Build all system's pieces
// Initialize database;
const db = require('./store/db');
let db_up = db.init();

// Execute migrations
const migrations = require('./internal/migrations');
let migrate = migrations.exec_migrations('pg', 'postgres');

// Setup and Start server
const server = require('./api/server');
let run_server = server.init().then(() => {
    server.run(process.env.TAPI_PORT);
});

// System going up event chain
db_up.then( () => {
    console.log('Connected to DB.');
    return migrate;
}).then(() => {
    console.log("Migrations ok.");
    return run_server;
}).then(() => {
    console.log('Server up and running. Listenning at '+ process.env.TAPI_PORT);
}).catch(err => {
    console.error("Could not build system: "+err);
    process.exit(1);
});
