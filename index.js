// Load the environment config
const dotenv = require('dotenv');
config = dotenv.config();
if (config.error) {
    console.error(config.error);
    process.exit(1);
}

// Initialize database;
const db = require('./store/db');
db.init(function(err){
    console.error(err);
    process.exit(1);
});

// Execute migrations
const migrations = require('./internal/migrations');
err = migrations.exec_migrations('pg', 'postgres', function(err){
    if (err) {
        console.error(err);
        process.exit(1);
    }
});


// Setup and Start server
const server = require('./api/server');
const s = server.init();
const listenner = server.start(s, process.env.TAPI_PORT);

// Lock graceful shutdown routine
const system = require('./internal/system');
system.graceful_shutdown(listenner, db);
