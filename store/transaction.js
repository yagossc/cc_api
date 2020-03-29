const db = require('./db');

module.exports.insert = async function(transaction) {

    query = `INSERT INTO
             transactions(transaction_id, transaction_nsu, transaction_value, transaction_cflag, transaction_type, transaction_date)
             VALUES ($1, $2, $3, $4, $5, $6)
             returning *`;

    const params = [transaction.data.uuid,
                    transaction.data.nsu,
                    transaction.data.valor,
                    transaction.data.bandeira == 'VISA' ? 'v':'m',
                    transaction.data.modalidade == 'debito' ? 'd':'c',
                    transaction.data.horario];

    return db.query(query, params);
}
