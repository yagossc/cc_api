// Load the environment config
const dotenv = require('dotenv');
dotenv.config();

// Server module
const server = require('./api/server');

// Setup server
const s = server.setup();

// Start listening
const connection = server.start(s, process.env.TAPI_PORT);

// Lock graceful shutdown routine
const system = require('./internal/system');
system.graceful_shutdown(connection, s.db);

// Setup doc
const swaggerapi = require('./swagger');
swaggerapi(s.app);

// Execute migrations
const migrations = require('./internal/migrations');
err = migrations.exec_migrations();
if (err != null) os.exit(1);
