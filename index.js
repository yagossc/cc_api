// Load the environment config
const dotenv = require('dotenv'); // FIXME: add a config module
config = dotenv.config();
if (config.error) {
    console.error(config.error);
    process.exit(1);
}

// Lock graceful shutdown routine
const system = require('./internal/system');
system.gracefulShutdown();

// Initialize database;
const db = require('./store/db');
let dbRun = db.init(process.env.DB_DRIVER);

// Execute migrations
const migrations = require('./internal/migrations');
let migrate = migrations.execMigrations('pg', 'postgres');

// Setup and Start server
const server = require('./api/server');
let runServer = server.init().then(() => {
    server.run(process.env.TAPI_PORT);
});

// System going up event chain
dbRun.then( () => {
    console.log('Connected to DB.');
    return migrate;
}).then(() => {
    console.log("Migrations ok.");
    return runServer;
}).then(() => {
    console.log('Server up and running. Listenning at '+ process.env.TAPI_PORT);
}).catch(err => {
    console.error("Could not build system: "+err);
    process.exit(1);
});
