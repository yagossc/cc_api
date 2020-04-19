// one transfers data from an object with
// fields named from the database's table
// to one with the api exchangeable fields names
let one = module.exports.one = function(data) {
    dtobj = {};
    dtobj.nsu =        data.transaction_nsu;
    dtobj.valor =      data.transaction_valor;
    dtobj.liquido =    data.transaction_liquido;
    dtobj.bandeira =   data.transaction_bandeira == 'v' ? 'VISA' : 'MASTERCARD';
    dtobj.modalidade = data.transaction_modalidade == 'd' ? 'debito' : 'credito';
    dtobj.horario =    data.transaction_horario;
    dtobj.disponivel = data.transaction_disponivel;

    return dtobj;
}

// many transfers data from an array
// of database query results to the
// expected api response format
module.exports.many = function(data) {
    let dtobj = [];
    let check_count = 0;
    data.forEach(function(item){
        check_count = dtobj.push(one(item));
    });
    if (check_count != data.length) return [];
    return dtobj;
}
