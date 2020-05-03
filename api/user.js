const hash = require('../internal/hash');
const jwt = require('../internal/jwt');
const model = require('../app/user');
const store = require('../store/user');
const {v4: uuid} = require('uuid');

module.exports.insertUser = async function(req, res, next) {
    incoming = model.sanitize(req.body);

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
        await validateInput; incoming.id = uuid();
        await store.insert(incoming);
        let insertedUser = await store.findByID(incoming.id);
        res.json({message: `User '${insertedUser.user_name}' created.`});
    }catch(err){
        next(err);
    }
}

module.exports.login =  async function(req, res, next) {
    console.log(req.body);
    incoming = model.sanitize(req.body);
    console.log(incoming)

    // Input validations Promise
    var validations = new Promise((resolve, reject) => {
        try {
            if (!incoming.name || !incoming.password) {
                throw new Error('invalid.credentials');
            }
        }catch(err){
            reject(err);
        }
        resolve();
    });

    try {
        await validations;
        let user = await store.findByName(incoming.name);
        let hashPassword = await hash.newHexHash(incoming.password);
        console.log("User retrieved: "+JSON.stringify(user));

        if (hashPassword != user.user_pwd) {
            throw new Error('invalid.credentials')
        }
        // Generate token
        let jwtToken = await jwt.sign({authorized: true});
        res.json({token: jwtToken});
    }catch(err){
        console.error('Error: '+err.message);
        next(err);
    };
}
