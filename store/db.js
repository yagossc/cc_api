const { Client } = require('pg');
const assert = require('assert').strict;

let db;
let driver;

// init opens the database connection
module.exports.init = function(callback) {
    if (db){
        console.warn("Trying to init DB again.");
        return callback(new Error('Database already initialized'));
    }

    driver = 'pg';

    db = new Client({
        user:     process.env.DB_USER,
        host:     process.env.DB_HOST,
        database:  process.env.DB,
        password: process.env.DB_PASS,
        port:     process.env.DB_PORT,
    });

    db.connect().
        then(function(success){
            console.log('Connected to DB.');
        }).
        catch(function(err){
            return callback(new Error('Could not connect to database'+err.stack));
        });
}

// get returns the active database connection
module.exports.get = function() {
    assert.ok(db, "Database not initialized, please call init().");
    return db;
}

// query returns a promise for a given sql query
module.exports.query = function(query, params) {
    switch(driver){
    case 'pg':
        return db.query(query, params);
        break;
    case 'sqlite':
        return new Promise(function(resolve, reject){
            db.all(query, params, function(err, rows){
                if (err) {
                    reject("Could not perform query: "+err.message);
                }
                let result = {}
                result.rows = rows;
                resolve(result);
            });
        });
    }
}

module.exports.mock = function(callback) {
    if (db){
        console.warn("Trying to init DB again.");
        return callback(new Error('Database already initialized'));
    }

    driver = 'sqlite'
    const sqlite3 = require('sqlite3').verbose();

    db = new sqlite3.Database(':memory:', function(err){
        if (err) {
            return callback(new Error("Could not connect to database: "+err.message));
        }
        console.log('Connected to DB.');
    });

}
