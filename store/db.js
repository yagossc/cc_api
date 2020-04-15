const { Client } = require('pg');
const assert = require('assert').strict;

let db;
let driver;

// init opens the database connection
module.exports.init = function() {
    return new Promise((resolve, reject) => {
        if (db){
            console.warn("Trying to init DB again.");
            reject('Database already initialized');
        }

        driver = 'pg';

        db = new Client({
            user:     process.env.DB_USER,
            host:     process.env.DB_HOST,
            database:  process.env.DB,
            password: process.env.DB_PASS,
            port:     process.env.DB_PORT,
        });

        resolve();
    }).then(() => db.connect());
}

// get returns the active database connection
module.exports.get = function() {
    assert.ok(db, "Database not initialized, please call init().");
    return db;
}

// query returns a promise for a given sql query
module.exports.query = function(query, params) {
    assert.ok(db, "Database not initialized, please call init().");
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

// mock mocks a in memory sqlite db for testing
module.exports.mock = function(callback) {
    return new Promise((resolve, reject) => {
        driver = 'sqlite'
        const sqlite3 = require('sqlite3').verbose();
        if (db){
            console.warn("Trying to init DB again.");
            reject('Database already initialized');
        }

        db = new sqlite3.Database(':memory:', function(err){
            if (err) {
                reject(err.message);
            }
        });
        resolve();
    });
}

// close closes the current database connection
module.exports.close = function() {
    assert.ok(db, "Database not initialized, please call init().");
    return new Promise(resolve => {
        switch(driver){
        case 'pg':
            db.end(() => {
                console.log("Database disconnected.");
                resolve();
            });
            break;
        default:
            reject('Unknown driver.');
        }
    })
}
