const transaction = require("../app/transaction");
const valid = require("./valid");

module.exports.insert_transaction = function(req, res, next) {
    incoming = new transaction(req.body);

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
            if (!incoming.data.modalidade || valid.modalidade(incoming.data.modalidade)) {
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

    validate_input.then(
        function(sucess){
            res.json(req.body);
        },
        function(err){
            next(err)
        });
}

module.exports.get_all_transactions = function(req, res) {
    res.json(req.body);
}

module.exports.get_balance = function(req, res) {
    res.json(req.body);
}
