module.exports.valor = function(val){
    if (val < 0) return false;
    if (val.toString().split('.').length > 2) return false;
    // console.log(parseFloat(val.toString()).toFixed(2));
    return !isNaN(val);
}
