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
        await validations; incoming.id = uuid();
        let checkExistingUser = await store.findByName(incoming.name);
        if (checkExistingUser.rows.length != 0) {
            throw new Error('invalid.credentials');
        }

        await store.insert(incoming);
        let insertedUser = await store.findByID(incoming.id);
        if (insertedUser.rows.length == 0) {
            throw new Error('insertion.error');
        }

        res.json({message: `User '${insertedUser.rows[0].user_name}' created.`});
    }catch(err){
        console.error('Error: '+err.message);
        next(err);
    }
}

module.exports.login =  async function(req, res, next) {
    incoming = model.sanitize(req.body);

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
        let queryResult = await store.findByName(incoming.name);
        if (queryResult.rows.length == 0) {
           throw new Error('invalid.credentials')
        }

        let user = queryResult.rows[0];
        let hashPassword = await hash.newHexHash(incoming.password);

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
