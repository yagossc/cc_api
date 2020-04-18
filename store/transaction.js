const db = require('./db');
const fees = require('../internal/fees');
const withdraw = require('../internal/withdraw_date');

module.exports.insert = function(transaction) {

    query = `INSERT INTO
             transactions(transaction_id,
                          transaction_nsu,
                          transaction_valor,
                          transaction_bandeira,
                          transaction_modalidade,
                          transaction_horario,
                          transaction_liquido,
                          transaction_disponivel)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    const params = [transaction.id,
                    transaction.nsu,
                    transaction.valor,
                    transaction.bandeira == 'VISA' ? 'v':'m',
                    transaction.modalidade == 'debito' ? 'd':'c',
                    transaction.horario,
                    fees.collect(transaction.modalidade, transaction.valor),
                    withdraw.get(transaction.horario, transaction.modalidade)];

    return db.query(query, params);
}

module.exports.find_by_id = function(id) {
    query = `SELECT transaction_id,
                    transaction_nsu,
                    transaction_valor,
                    transaction_bandeira,
                    transaction_modalidade,
                    transaction_horario,
                    transaction_liquido,
                    transaction_disponivel
             FROM   transactions
             WHERE  transaction_id = $1`;
    return db.query(query, [id]);
}

module.exports.find_all = function() {
    query = `SELECT transaction_id,
                    transaction_nsu,
                    transaction_valor,
                    transaction_bandeira,
                    transaction_modalidade,
                    transaction_horario,
                    transaction_liquido,
                    transaction_disponivel
             FROM   transactions`;
    return db.query(query);
}

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
    dtobj.disponivel = data.transaction_disponivel;

    return dtobj;
}
