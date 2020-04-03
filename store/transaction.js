const db = require('./db');
const fees = require('../internal/fees');

module.exports.insert = function(transaction) {

    query = `INSERT INTO
             transactions(transaction_id, transaction_nsu, transaction_valor, transaction_bandeira, transaction_modalidade, transaction_horario, transaction_liquido)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`;
             // returning *`;

    const params = [transaction.id,
                    transaction.nsu,
                    transaction.valor,
                    transaction.bandeira == 'VISA' ? 'v':'m',
                    transaction.modalidade == 'debito' ? 'd':'c',
                    transaction.horario,
                    fees.collect(transaction.modalidade, transaction.valor)];

    return db.query(query, params);
}

module.exports.find_by_id = function(id) {
    query = `SELECT transaction_id,
                    transaction_nsu,
                    transaction_valor,
                    transaction_bandeira,
                    transaction_modalidade,
                    transaction_horario,
                    transaction_liquido
             FROM   transactions
             WHERE  transaction_id = $1`;
    return db.query(query, [id]);
    // return find_transaction(uuid, null, null, null, null, null);
}

// This is an attempt to make a generic function for find_by_*
// let find_transaction = function(uuid, nsu, valor, bandeira, modalidade, horario) {
//     query_first = `SELECT transaction_uuid,
//                     transaction_nsu,
//                     transaction_valor,
//                     transaction_bandeira,
//                     transaction_modalidade,
//                     transaction_horario
//              FROM   transaction
//              WHERE  1=1`;

//     query_uuid =       !uuid ?       null : `AND transaction_uuid = $1`;
//     query_nsu =        !nsu ?        null : `AND transaction_nsu = $1`;
//     query_valor =      !valor ?      null : `AND transaction_valor = $1`;
//     query_bandeira =   !bandeira ?   null : `AND transaction_bandeira = $1`;
//     query_modalidade = !modalidade ? null : `AND transaction_modalidade = $1`;
//     query_horario =    !horario ?   n null : `AND transaction_horario = $1`;
// }

// dto transfers data from an object with
// fields named from the database's table
// to one with the api exchangeable fields names
module.exports.dto = function(data) {
    dtobj = {};
    dtobj.nsu =        data.transaction_nsu;
    dtobj.valor =      data.transaction_valor;
    dtobj.liquido =    data.transaction_liquido;
    dtobj.bandeira =   data.transaction_bandeira == 'v' ? 'VISA' : 'MASTERCARD';
    dtobj.modalidade = data.transaction_modalidade == 'd' ? 'debito' : 'credito';
    dtobj.horario =    data.transaction_horario;

    return dtobj;
}
