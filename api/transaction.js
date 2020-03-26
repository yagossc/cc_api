const transaction = require("../app/transaction");

module.exports.insert_transaction = function(req, res) {
    incoming = new transaction(req.body);
    console.log("nsu:"+ incoming.data.nsu);
    console.log("valor:"+ incoming.data.valor);
    console.log("bandeira:"+ incoming.data.bandeira);
    res.json(req.body);
}

module.exports.get_all_transactions = function(req, res) {
    res.json(req.body);
}

module.exports.get_balance = function(req, res) {
    res.json(req.body);
}
