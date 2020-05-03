const jwt = require('jsonwebtoken');

module.exports.sign = function(user) {
    return new Promise((resolve, reject) => {
        jswt.sign(user, process.env.JWT_SECRET, function(err, token){
            if (err) reject(err);
            resolve(token);
        });
    })
}

module.exports.verify = function(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
            if (err) reject(err);
            resolve();
        })
    })
}
