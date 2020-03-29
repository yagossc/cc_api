const db_migrate = require('db-migrate');

module.exports.exec_migrations = function(driver, scope) {
    let options = {}
    switch(driver){
    case 'pg':
        options.env = 'pg';
        break;
    case 'sqlite':
        options.env = 'test';
        break;
    default:
        console.error("Driver not implemented yet.");
    }

    dbm = db_migrate.getInstance(true, options);
    dbm.up(scope);
}
