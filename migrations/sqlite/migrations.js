module.exports.up = function(db, callback) {
    var migrations = [];
    migrations[0] = `CREATE TABLE transactions (
                transaction_id UUID NOT NULL,
                transaction_nsu TEXT NOT NULL,
                transaction_valor FLOAT(2),
                transaction_bandeira VARCHAR(1),
                transaction_modalidade VARCHAR(1),
                transaction_horario TIMESTAMP,

                CONSTRAINT pk_transaction PRIMARY KEY (transaction_id)
              );`

    migrations[1] = `ALTER TABLE transactions
                ADD COLUMN transaction_liquido FLOAT(2);`

    for(let i = 0; i < migrations.length; i++){
        run_migration(db, migrations[i], function(err){
            if(err){
                console.log("Could not run migration-"+i);
            } else {
                console.log("Migration run.");
            }
        });
    }
}

let run_migration = async function(db, migration, callback) {
    await db.run(migration, [], function(err){
        if (err) {
            return new Error("Could not migrate sqlite3 db: "+err.message);
        }
        console.log("Migration ok.");
    });
}
