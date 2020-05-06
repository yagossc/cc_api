const crypto = require('crypto');

// returns a sha256 hash of a given input
module.exports.newHexHash = function(input) {
    return new Promise(resolve => {
        let hash = crypto.createHmac('sha256', input).digest('hex');
        resolve(hash);
    });
}
