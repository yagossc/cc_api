const db = require('./db');

module.exports.insert = async function(transaction) {

    query = `INSERT INTO
             transactions(transaction_id, transaction_nsu, transaction_valor, transaction_bandeira, transaction_modalidade, transaction_horario)
             VALUES ($1, $2, $3, $4, $5, $6)
             returning *`;

    const params = [transaction.uuid,
                    transaction.nsu,
                    transaction.valor,
                    transaction.bandeira == 'VISA' ? 'v':'m',
                    transaction.modalidade == 'debito' ? 'd':'c',
                    transaction.horario];

    return db.query(query, params);
}

// dto transfers data from an object with
// fields named from the database's table
// to one with the api exchangeable fields names
module.exports.dto = function(data) {
    dtobj = {};
    dtobj.nsu =        data.transaction_nsu;
    dtobj.valor =      data.transaction_valor;
    dtobj.bandeira =   data.transaction_bandeira;
    dtobj.modalidade = data.transaction_modalidade;
    dtobj.horario =    data.transaction_horario;

    return dtobj;
}
