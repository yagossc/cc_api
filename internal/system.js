let system = {}

module.exports.graceful_shutdown = function(server_conn, db_conn){
    system.server_conn = server_conn;
    system.db_conn     = db_conn;

    process.on('SIGTERM', handle)
    process.on('SIGINT', handle);
}

handle = function(server_conn, db_conn) {
    console.log("Shutting down...\n");
    system.server_conn.close(function() {
        system.db_conn.end(function(){
            console.log("Gracefully shutdown.")
            process.exit(0)
        })
    })
}
