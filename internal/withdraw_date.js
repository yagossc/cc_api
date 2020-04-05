module.exports.get = function(date, modalidade) {
    var withdraw_date = new Date(date);
    Date.prototype.add_days = function(days) {
        var withdraw_date = new Date(this.valueOf());
        withdraw_date.setDate(withdraw_date.getDate() + days);
        return withdraw_date;
    }

    return modalidade == 'debito' ? next_business_day(withdraw_date) : next_business_day(withdraw_date.add_days(30));
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
