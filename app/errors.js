// handler is the custom error handler for the api/express
module.exports.handler = function(err, req, res, next) {
    var errorCodes = new Map([
        ["invalid.nsu", "Invalid 'NSU' for transaction."],
        ["invalid.valor", "Invalid 'valor' for transaction."],
        ["invalid.bandeira", "Invalid 'bandeira' for transaction."],
        ["invalid.modalidade", "Invalid 'modalidade' for transaction."],
        ["invalid.horario", "Invalid 'horario' for transaction."],
        ["invalid.name", "Invalid name."],
        ["invalid.password", "Invalid password."],
        ["invalid.credentials", "Invalid credentials. Please, try again, or not."],
        ["auth.error", "Authorization error. Please, try again, or not."],
    ]);

    // Send 'Bad Request' status
    let errMessage = "Internal Server Error";
    let code = 400;
    errorCodes.has(err.message) ? errMessage = errorCodes.get(err.message) : code = 500;
    res.status(code);
    res.json({ message: errMessage });
}
