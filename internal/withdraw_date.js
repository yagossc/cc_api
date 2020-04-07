// get the available withdraw date for the transaction
module.exports.get = function(date, modalidade) {
    var withdraw_date = new Date(date);
    Date.prototype.add_days = function(days) {
        var withdraw_date = new Date(this.valueOf());
        withdraw_date.setDate(withdraw_date.getDate() + days);
        return withdraw_date;
    }

    withdraw_date = modalidade == 'debito' ? next_business_day(withdraw_date.add_days(1)) : next_business_day(withdraw_date.add_days(30));
    return format_YYYY_MM_DD(withdraw_date);
}

// format the output date as YYYY-MM-DD
var format_YYYY_MM_DD = function(date) {
    // Ensure day 2-digit
    let fmtday = date.getDate().toString();
    fmtday.length == 1 ? fmtday = '0'+fmtday : fmtday;

    // Ensure month 2-digit
    let fmtmonth = (date.getMonth() + 1).toString();
    fmtmonth.length == 1 ? fmtmonth = '0'+fmtmonth : fmtmonth;

    return date.getFullYear()+'-'+fmtmonth+'-'+fmtday;
}

// next_business_day calculates the
// next business day for a given date
var next_business_day = function(date) {
    var day = date.getDay();

    switch(day){
    case 0:
        return date.add_days(1);
        break;
    case 6:
        return date.add_days(2);
        break;
    default:
        return date;
    }
}
