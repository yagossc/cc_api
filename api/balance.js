const transactions_store = require('../store/transaction');
const balance_dto = require('./balance_dto');

// GET /balance
module.exports.get_balance = async function(req, res, next) {
    try{
        let transactions = await transactions_store.find_all();
        let balance = await balance_dto.calculate(transactions.rows);

        res.json(balance);
    }catch(err){
        console.error('Error: '+err.message);
        next(err);
    };
}
