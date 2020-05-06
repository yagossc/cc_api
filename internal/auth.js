const jwt = require('./jwt');

// validator validates the the auth situation
module.exports.validator = async function(req, res, next) {

    try {
        if (!process.env.DISABLE_AUTH){

            let authHeader = req.headers.authorization;
            if(!authHeader) {
                throw new Error('auth.error');
            }
            let token = authHeader.split(' ')[1]; // Bearer token
            let decoded = await jwt.verify(token);

            // this is the place to parse any claims
        }

    }catch(err){
        console.error('Authorization error: '+err);
        next(err);
    }

    next();
}
