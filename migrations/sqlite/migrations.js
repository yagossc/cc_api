module.exports.up = function(db, callback) {
    var migrations = [];
    migrations[0] = `CREATE TABLE transactions (
                transaction_id UUID NOT NULL,
                transaction_nsu TEXT NOT NULL,
                transaction_valor FLOAT(2),
                transaction_bandeira VARCHAR(1),
                transaction_modalidade VARCHAR(1),
                transaction_horario TIMESTAMP,
                transaction_liquido FLOAT(2),

                CONSTRAINT pk_transaction PRIMARY KEY (transaction_id)
              );`

    // migrations[1] = `ALTER TABLE transactions
    //             ADD COLUMN transaction_liquido FLOAT(2);`

    let migration_error;
    for(let i = 0; i < migrations.length; i++){
        db.run(migrations[i], [], function(err){
            if (err) {
                migration_error = new Error("Could not migrate sqlite3 db: "+err.message);
            }
            console.log("Migration ok.");
        });
    }
    if (migration_error) return callback(migration_error);
}
