module.exports.handler = function(err, req, res, next) {
    var error_codes = new Map([
        ["invalid.nsu", "Invalid 'NSU' for transaction."],
        ["invalid.valor", "Invalid 'value' for transaction."],
        ["invalid.bandeira", "Invalid 'bandeira' for transaction."],
        ["invalid.modalidade", "Invalid 'modalidade' for transaction."],
        ["invalid.horario", "Invalid 'horario' for transaction."],
    ]);

    // Send 'Bad Request' status
    res.status(400);
    res.json({ message: error_codes.get(err.message) });
}
