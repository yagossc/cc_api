// simulates fee collection over transaction
module.exports.collect = function(type, value) {
    let liquid;
    switch(type){
    case 'debito':
        return round(0.98*value);
        break;
    default:
        return round(0.97*value);
        break;
    }
}

// Shift decimal two slots left,
// then round to closest integer,
// then go back to float.
let round = module.exports.round = function(num){
    return ((Math.round(num * 100))/100);
}
