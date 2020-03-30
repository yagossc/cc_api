const db = require('../store/db');
let system = {}

module.exports.graceful_shutdown = function(server_conn, db_conn){
    system.server_conn = server_conn;

    process.on('SIGTERM', handle)
    process.on('SIGINT', handle);
}

handle = function(server_conn, db_conn) {
    console.log("Shutting down...\n");
    system.server_conn.close(function() {
        console.log("Server disconnected...");
        conn = db.get();
        conn.end(function(){
            console.log("Database disconnected...");
            console.log("Graceful shutdown.")
            process.exit(0)
        })
    })
}
