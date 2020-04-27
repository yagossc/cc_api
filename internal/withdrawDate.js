// FIXME: promisify this module

// get the available withdraw date for the transaction
module.exports.get = function(date, modalidade) {
    var withdrawDate = new Date(date);
    Date.prototype.addDays = function(days) { // FIXME: do a proper dates module
        var withdrawDate = new Date(this.valueOf());
        withdrawDate.setDate(withdrawDate.getDate() + days);
        return withdrawDate;
    }

    withdrawDate = modalidade == 'debito' ? nextBusinessDay(withdrawDate.addDays(1)) : nextBusinessDay(withdrawDate.addDays(30));
    return formatDate(withdrawDate);
}

// format the output date as yyyy-mm-dd
var formatDate = function(date) {
    // Ensure day 2-digit
    let fmtday = date.getDate().toString();
    fmtday.length == 1 ? fmtday = '0'+fmtday : fmtday;

    // Ensure month 2-digit
    let fmtmonth = (date.getMonth() + 1).toString();
    fmtmonth.length == 1 ? fmtmonth = '0'+fmtmonth : fmtmonth;

    return date.getFullYear()+'-'+fmtmonth+'-'+fmtday;
}

// calculates the next business day for given date
var nextBusinessDay = function(date) {
    var day = date.getDay();

    switch(day){
    case 0:
        return date.addDays(1);
        break;
    case 6:
        return date.addDays(2);
        break;
    default:
        return date;
    }
}
