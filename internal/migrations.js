const db_migrate = require('db-migrate');
const path = require('path');

module.exports.exec_migrations = function(driver, scope, callback) {
    let options = {}
    switch(driver){
    case 'pg':
        options.env = 'pg';
        dbm = db_migrate.getInstance(true, options);
        dbm.up('','postgres');
        break;

    case 'sqlite':
        let migration = require('../migrations/sqlite/migrations');
        let db = require('../store/db').get();
        migration.up(db, callback);
        break;

    default:
        console.error("Driver not implemented yet.");
    }
}
