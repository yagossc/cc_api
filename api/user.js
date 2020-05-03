const model = require('../app/user');
const store = require('../store/user');

module.exports.login =  function(req, res, next) {
    incoming = model.user.sanitize(req.body);

    // Input validations Promise
    var validations = new Promise((resolve, reject) => {
        try {
            if (!incoming.name) {
                throw new Error('invalid.name');
            }
            if (!incoming.password) {
                throw new Error('invalid.password');
            }

        }catch(err){
            reject(err);
        }
        resolve();
    });
    try {
        let user = store.findByName(incoming.name);
    }
    res.end(`Here's the login`);
}
