const db = require('./db');
const fees = require('../internal/fees');
const withdraw = require('../internal/withdrawDate');
const {v4: uuid} = require('uuid');

let insert = module.exports.insert = function(transaction) {

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

module.exports.findByID = function(id) {
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

module.exports.findAll = function() {
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

module.exports.mock = function() { // FIXME: do a proper test module

    let transaction_disponivel = {
        id:         uuid(),
        nsu:        '0451456',
        valor:      100,
        bandeira:   'VISA',
        modalidade: 'debito',
        horario:    '1900-01-04T12:43:20-03:00'
    };

    let today = new Date().toString();
    let transaction_receber = {
        id:         uuid(),
        nsu:        '0451456',
        valor:      100,
        bandeira:   'VISA',
        modalidade: 'credito',
        horario:    today
    };
    return insert(transaction_disponivel).then(() => insert(transaction_receber));
}
