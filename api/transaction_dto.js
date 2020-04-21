// one transfers data from an object with
// fields named from the database's table
// to one with the api exchangeable fields names
let one = module.exports.one = async function(data) {
    return new Promise(resolve => {
        dtobj = {};
        dtobj.nsu =        data.transaction_nsu;
        dtobj.valor =      data.transaction_valor;
        dtobj.liquido =    data.transaction_liquido;
        dtobj.bandeira =   data.transaction_bandeira == 'v' ? 'VISA' : 'MASTERCARD';
        dtobj.modalidade = data.transaction_modalidade == 'd' ? 'debito' : 'credito';
        dtobj.horario =    data.transaction_horario;
        dtobj.disponivel = data.transaction_disponivel;

        resolve(dtobj);
    })
}

// many transfers data from an array
// of database query results to the
// expected api response format
module.exports.many = async function(data) {
    let dtobj = [];
    let check_count = 0;
    for(let i = 0; i < data.length; i++){
        let tmp = await one(data[i]);
        check_count = dtobj.push(tmp);
    }
    if (check_count != data.length) return new Error('could not do data transfer');
    else return dtobj;
}
