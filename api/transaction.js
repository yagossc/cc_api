const transaction_model = require("../app/transaction");
const transaction_store = require("../store/transaction");
const valid = require("./valid");
const {v4: uuid} = require("uuid");

module.exports.insert_transaction = function(req, res, next) {
    incoming = transaction_model.sanitize(req.body);

    var validate_input = new Promise( function(resolve, reject){
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

    validate_input.
        then(function(validated){
            incoming.uuid = uuid();
            return transaction_store.insert(incoming);
        }).catch(function(err){
            console.error("Insertion error: "+err.message);
            next(err);
        }).
        then(function(inserted){
            console.log("Inserted new transaction:");
            console.log(inserted.rows[0]);

            // transfer data to response format
            result = transaction_store.dto(inserted.rows[0]);
            result.bandeira = result.bandeira == 'v' ? 'VISA':'MASTERCARD';
            result.modalidade = result.modalidade == 'd' ? 'debito':'credito';
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
