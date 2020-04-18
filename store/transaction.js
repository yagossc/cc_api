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
