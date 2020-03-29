const { Client } = require('pg');
const assert = require('assert').strict;

let db;

// init opens the database connection
module.exports.init = function(callback) {
    if (db){
        console.warn("Trying to init DB again.");
        return callback(new Error('Database already initialized'));
    }

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
module.exports.query = function(query, params, callback) {
    return new Promise(function(resolve, reject){
        assert.ok(db, "Database not initialized, please call init().").then(
            function(db_exists){
                return db.query(query, params)
            },
            function(err){
                reject(err.message);
            }
        ).then(
            function(query_sucessful){
                resolve(query_sucessful);
            },
            function(err){
                reject(err.message);
            }
        ).catch(function(err){
            reject(err.message);
        });
    });
}
