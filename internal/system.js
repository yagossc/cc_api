const db = require('../store/db');
const server = require('../api/server');

// gracefulShutdown listens for some signals
// to properly cleanup before system shutdown
module.exports.gracefulShutdown = function(){
    process.on('SIGTERM', handle)
    process.on('SIGINT', handle);
}

// handle handles the received signal
handle = async function() {
    let code = 0;
    console.log("Shutting down...\n");
    let serverShutdown = server.close();
    serverShutdown
        .catch(err => {
            console.log("Error in shutdown proces: "+err);
            code = 1; // Exit with error code
        })
        .then(() => db.close())
        .catch(err => {
            console.log("Error in shutdown proces: "+err);
            code = 1; // Exit with error code
        })
        .then(() => {
            console.log("Graceful shutdown.")
            process.exit(code);
        });
}
