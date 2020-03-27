const transaction = require("../app/transaction");

module.exports.insert_transaction = function(req, res, next) {
    incoming = new transaction(req.body);
    if (incoming.data.nsu == null) {
        var err = new Error("invalid.nsu");
        next(err);
    }
    // res.json(req.body);
}

module.exports.get_all_transactions = function(req, res) {
    res.json(req.body);
}

module.exports.get_balance = function(req, res) {
    res.json(req.body);
}
