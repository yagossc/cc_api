// Load the environment config
const dotenv = require('dotenv');
config = dotenv.config();
if (config.error) {
    console.error(config.error);
    process.exit(1);
}

// Initialize database;
const db = require('./store/db');
let db_up = db.init();
db_up.then( success => {
    console.log('Connected to DB.');
}).catch(err => {
    console.error("Could not connect to database: "+err);
    process.exit(1);
});

// Execute migrations
const migrations = require('./internal/migrations');
let migrated = migrations.exec_migrations('pg', 'postgres');
migrated.then(success => {
    console.log("Migrations ok.");
}).catch(err => {
    console.error("Could not exec migrations: "+err);
    process.exit(1);
});

// Setup and Start server
const server = require('./api/server');
const s = server.init();
const run_server = server.run(s, process.env.TAPI_PORT);
run_server.then(success => {
    console.log('Server up and running. Listenning at '+ process.env.TAPI_PORT);
}).catch(err => {
    console.error("Could not start server: "+err);
    process.exit(1);
});

// Lock graceful shutdown routine
// const system = require('./internal/system');
// system.graceful_shutdown(listenner, db);
