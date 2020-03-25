const db_migrate = require('db-migrate');

const options = {
    driver:   "pg",
    user:     process.env.DB_USER,
    host:     process.env.DB_HOST,
    databse:  process.env.DB,
    password: process.env.DB_PASS,
    port:     process.env.DB_PORT,
    schema:   "public"
}

module.exports.exec_migrations = function(){
    dbm = db_migrate.getInstance(true, options);
    dbm.up();
}
