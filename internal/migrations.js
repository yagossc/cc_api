const dbMigrate = require('db-migrate');
const path = require('path');

module.exports.execMigrations = function(driver, scope) {
    let options = {}
    switch(driver){
    case 'pg':
        options.env = 'pg';
        dbm = dbMigrate.getInstance(true, options);
        return dbm.up('','postgres');
        break;

    case 'sqlite':
        let migration = require('../migrations/sqlite/migrations');
        let db = require('../store/db').get();
        return migration.up(db);
        break;

    default:
        console.error("Driver not implemented yet.");
    }
}
