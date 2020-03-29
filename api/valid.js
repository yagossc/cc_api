module.exports.valor = function(val){
    if (val < 0) return false;
    if (val.toString().split('.').length > 2) return false;
    // console.log(parseFloat(val.toString()).toFixed(2));
    return !isNaN(val);
}

module.exports.bandeira = function(val){
    return val == 'VISA' || val == 'MASTERCARD';
}

module.exports.modalidade = function(val){
    return val == 'debito' || val == 'credito';
}

module.exports.horario = function(val){
    //Check if is a valid date format
    var date = Date.parse(val);
    if (isNaN(date)) return false;

    //Check if it is not a future transaction
    return date < Date.now();
}
