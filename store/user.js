const db = require('./db');
const {v4: uuid} = require('uuid');

module.exports.findByName = function(name) {
    query = `SELECT user_id,
                    user_name,
                    user_pwd
             FROM   user_account
             WHERE  user_name = $1`;

    return db.query(query, [name]);
}
