const transaction_model = require("../app/transaction");
const transaction_store = require("../store/transaction");
const valid = require("./valid");
const {v4: uuid} = require("uuid");

module.exports.insert_transaction = async function(req, res, next) {
    incoming = transaction_model.sanitize(req.body);

    // Input validations Promise
    var validate_input = new Promise(function(resolve, reject){
        try {
            if (!incoming.nsu) {
                throw new Error("invalid.nsu");
            }
            if (!incoming.valor || !valid.valor(incoming.valor)) {
                throw new Error("invalid.valor");
            }
            if (!incoming.bandeira || !valid.bandeira(incoming.bandeira)) {
                throw new Error("invalid.bandeira");
            }
            if (!incoming.modalidade || !valid.modalidade(incoming.modalidade)) {
                throw new Error("invalid.modalidade");
            }
            if(!incoming.horario || !valid.horario(incoming.horario)){
                throw new Error("invalid.horario");
            }
        }catch(err){
            reject(err);
        }
        resolve();
    });


    try {
        await validate_input;
        incoming.id = uuid();
        await transaction_store.insert(incoming)
        let result_transaction = await transaction_store.find_by_id(incoming.id);
        res.json(transaction_store.dto(result_transaction.rows[0]));

    }catch(err){
        console.error("Error: "+err.message);
        next(err);
    };
}

module.exports.get_all_transactions = function(req, res) {
    res.json(req.body);
}

module.exports.get_balance = function(req, res) {
    res.json(req.body);
}
