const jwt = require('jsonwebtoken');

module.exports.sign = function(claims) {
    return new Promise((resolve, reject) => {
        jwt.sign(claims, process.env.JWT_SECRET, function(err, token){
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
