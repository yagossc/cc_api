const transaction_model = require("../app/transaction");
const transaction_store = require("../store/transaction");
const valid = require("./valid");
const {v4: uuid} = require("uuid");

module.exports.insert_transaction = function(req, res, next) {
    incoming = new transaction_model(req.body);

    var validate_input = new Promise( function(resolve, reject){
        try {
            if (!incoming.data.nsu) {
                throw new Error("invalid.nsu");
            }
            if (!incoming.data.valor || !valid.valor(incoming.data.valor)) {
                throw new Error("invalid.valor");
            }
            if (!incoming.data.bandeira || !valid.bandeira(incoming.data.bandeira)) {
                throw new Error("invalid.bandeira");
            }
            if (!incoming.data.modalidade || !valid.modalidade(incoming.data.modalidade)) {
                throw new Error("invalid.modalidade");
            }
            if(!incoming.data.horario || !valid.horario(incoming.data.horario)){
                throw new Error("invalid.horario");
            }
        }catch(err){
            reject(err);
        }
        resolve();
    });

    validate_input.
        then(function(validated){
            incoming.data.uuid = uuid();
            return transaction_store.insert(incoming);
        }).catch(function(err){
            console.log("Error inserting: "+err.message);
            next(err);
        }).
        then(function(inserted){
            console.log("Inserted new transaction:");
            console.log(inserted.rows);

            result = new transaction_model(inserted.rows);
            result.data.bandeira = result.data.bandeira == 'v' ? 'VISA':'MASTERCARD';
            result.data.modalidade = result.data.modalidade == 'd' ? 'debito':'credito';
            res.json(result);
        }).catch(function(err){
            console.error(err.message);
            next(err);
        });
}

module.exports.get_all_transactions = function(req, res) {
    res.json(req.body);
}

module.exports.get_balance = function(req, res) {
    res.json(req.body);
}
