module.exports.handler = function(err, req, res, next) {
    var error_codes = new Map([
        ["invalid.nsu", "Invalid 'NSU' for transaction."],
        ["invalid.valor", "Invalid 'valor' for transaction."],
        ["invalid.bandeira", "Invalid 'bandeira' for transaction."],
        ["invalid.modalidade", "Invalid 'modalidade' for transaction."],
        ["invalid.horario", "Invalid 'horario' for transaction."],
    ]);

    // Send 'Bad Request' status
    let err_message = "Internal Server Error";
    let code = 400;
    error_codes.has(err.message) ? err_message = error_codes.get(err.message) : code = 500;
    res.status(code);
    res.json({ message: err_message });
}
