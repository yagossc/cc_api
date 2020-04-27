const precision = require('../internal/fees');

// calculates the balance according to current date
module.exports.calculate = function(transactions) {
    return new Promise(resolve => {
        let balance = {};
        balance.disponivel = 0;
        balance.receber = 0;

        let today = new Date();

        transactions.forEach(function(item){
            let disponivel = new Date(item.transaction_disponivel);
            if (disponivel < today) balance.disponivel+=item.transaction_liquido;
            else balance.receber+=item.transaction_liquido;
        });

        // Round the results because javascript sucks with numbers
        balance.disponivel = precision.round(balance.disponivel);
        balance.receber = precision.round(balance.receber);

        resolve(balance);
    })
}
