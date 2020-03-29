const db = require('./db');

module.exports.insert = async function(transaction) {

    query = `INSERT INTO
             transactions(transaction_id, transaction_nsu, transaction_value, transaction_cflag, transaction_type, transaction_date)
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
