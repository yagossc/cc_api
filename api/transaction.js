const dto = require('./transactionDTO');
const model = require('../app/transaction');
const store = require('../store/transaction');
const valid = require('./valid');
const {v4: uuid} = require('uuid');

// POST /transaction handler function
module.exports.insertTransaction = async function(req, res, next) {
    incoming = model.sanitize(req.body);

    // Input validations Promise
    var validateInput = new Promise(function(resolve, reject){
        try {
            if (!incoming.nsu) {
                throw new Error('invalid.nsu');
            }
            if (!incoming.valor || !valid.valor(incoming.valor)) {
                throw new Error('invalid.valor');
            }
            if (!incoming.bandeira || !valid.bandeira(incoming.bandeira)) {
                throw new Error('invalid.bandeira');
            }
            if (!incoming.modalidade || !valid.modalidade(incoming.modalidade)) {
                throw new Error('invalid.modalidade');
            }
            if(!incoming.horario || !valid.horario(incoming.horario)){
                throw new Error('invalid.horario');
            }
        }catch(err){
            reject(err);
        }
        resolve();
    });


    try {
        await validateInput; incoming.id = uuid();
        await store.insert(incoming)
        let resultTransaction = await store.findByID(incoming.id);
        let responseTransaction = await dto.one(resultTransaction.rows[0]);
        res.json(responseTransaction);

    }catch(err){
        console.error('Error: '+err.message);
        next(err);
    };
}

// GET /transaction handler function
module.exports.getAll = async function(req, res, next) {
    try{
        let transactions = await store.findAll();
        let resTransactions = await dto.many(transactions.rows);
        res.json(resTransactions);
    }catch(err){
        console.error('Error: '+err.message);
        next(err);
    }
}
