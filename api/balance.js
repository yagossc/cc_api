const store = require('../store/transaction');
const dto = require('./balanceDTO');

// GET /balance
module.exports.getBalance = async function(req, res, next) {
    try{
        let transactions = await store.findAll();
        let balance = await dto.calculate(transactions.rows);

        res.json(balance);
    }catch(err){
        console.error('Error: '+err.message);
        next(err);
    };
}
