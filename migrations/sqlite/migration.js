module.exports.up = function(db, callback) {
    query = `CREATE TABLE transactions (
            transaction_id UUID NOT NULL,
            transaction_nsu TEXT NOT NULL,
            transaction_valor FLOAT(2),
            transaction_bandeira VARCHAR(1),
            transaction_modalidade VARCHAR(1),
            transaction_horario TIMESTAMP,

            CONSTRAINT pk_transaction PRIMARY KEY (transaction_id)
        );`
        db.run(query, [], function(err){
            if (err) {
                return callback(new Error("Could not migrate sqlite3 db: "+err.message));
            }
            console.log("Migration ok.");
        });
}
