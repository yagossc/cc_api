module.exports.up = async function(db) {
    var migrations = [];
    migrations[0] = `CREATE TABLE transactions (
                transaction_id UUID NOT NULL,
                transaction_nsu TEXT NOT NULL,
                transaction_valor FLOAT(2),
                transaction_bandeira VARCHAR(1),
                transaction_modalidade VARCHAR(1),
                transaction_horario TEXT,

                CONSTRAINT pk_transaction PRIMARY KEY (transaction_id));
                `

    migrations[1] = `ALTER TABLE transactions
                     ADD COLUMN transaction_liquido FLOAT(2);`

    migrations[2] = `ALTER TABLE transactions
                     ADD COLUMN transaction_disponivel TEXT;`

    for(let i = 0; i < migrations.length; i++){
        await run_migration(db, migrations[i]);
        console.log("Migration["+i+"] ok.");
    }
}

let run_migration = function(db, migration) {
    return new Promise((resolve, reject) => {
        db.run(migration, [], function(err){
            if (err) {
                reject("Could not migrate sqlite3 db: "+err.message);
            }
            resolve("Migration ok.");
        });
    })
}
