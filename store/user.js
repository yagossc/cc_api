const db = require('./db');
const hash = require('../internal/hash');
const {v4: uuid} = require('uuid');

module.exports.insert = function(user) {

    query = `INSERT INTO user_account(user_id, user_name, user_pwd)
             VALUES ($1, $2, $3)`;

    hashPassword = hash.newHexHash(user.password);

    const params = [user.id, user.name, hashPassword];

    return db.query(query, params);
}

module.exports.findByID= function(id) {
    query = `SELECT user_id, user_name, user_pwd
             FROM   user_account
             WHERE  user_id = $1`;

    return db.query(query, [id]);
}

module.exports.findByName = function(name) {
    query = `SELECT user_id, user_name, user_pwd
             FROM   user_account
             WHERE  user_name = $1`;

    return db.query(query, [name]);
}
