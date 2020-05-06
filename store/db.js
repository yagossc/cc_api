const { Client } = require('pg');
const assert = require('assert').strict;

let db;
let driver;

// init opens the database connection
module.exports.init = function(dbDriver) {
    return new Promise((resolve, reject) => {
        if (db){
            console.warn("Trying to init DB again.");
            reject('Database already initialized');
        }
        resolve();
    }).then(() => {
        new Promise((resolve, reject) => {
            switch(dbDriver){
            case 'pg':
                driver = 'pg';
                db = new Client({
                    user:     process.env.DB_USER,
                    host:     process.env.DB_HOST,
                    database: process.env.DB,
                    password: process.env.DB_PASS,
                    port:     process.env.DB_PORT,
                });
                break;

            case 'sqlite':
                driver = 'sqlite'
                const sqlite3 = require('sqlite3').verbose();
                db = new sqlite3.Database(':memory:', function(err){
                    if (err) {
                        reject(err.message);
                    }
                });
                break;

            default:
                reject('Unknown driver');

            }
            resolve();
        })
    }).then(() => {
        if (driver == 'pg'){
            db.connect();
        } else {
            new Promise(resolve => resolve());
        }
    });
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
        return new Promise((resolve, reject) => {
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

// close closes the current database connection
module.exports.close = function() {
    return new Promise((resolve, reject) => {
        assert.ok(db, "Database not initialized, please call init().");
        switch(driver){
        case 'pg':
            db.end(() => {
                console.log("Database disconnected.");
                resolve();
            });
            break;

        case 'sqlite':
            resolve();
            break;

        default:
            reject('Unknown driver.');
        }
    })
}
